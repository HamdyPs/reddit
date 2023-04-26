const form = document.querySelector("#signin-form");
const forgotPasswordForm = document.querySelector('.forgotPasswordForm');
const questions = document.querySelector('.questions');
const passwordDivBtn = document.querySelector('.passwordDivBtn');
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const fd = {
    username: data.get("name"),
    password: data.get("password"),
  };

  axios.post("/api/auth/signin", fd).then((res) => {
    console.log(res.data);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        id: res.data.user.id,
        username: res.data.user.username,
        email: res.data.user.email,
      })
    );
    if (res.status === 200) {
      window.location.href = "/";
    }
  });
});

passwordDivBtn.addEventListener('click',(e)=>{
  e.preventDefault()
	forgotPasswordForm.style.visibility = 'visible'
	axios.get('/api/auth/questions').then(response=>{
		console.log(response.data.data);
		response.data.data.forEach(data=>{
			const option = document.createElement('option');
			option.textContent = data.question
			questions.appendChild(option)
		})
	})
	forgotPasswordForm.addEventListener('submit',(e)=>{
		e.preventDefault()
		const obj = new FormData(forgotPasswordForm)
		const data = Object.fromEntries(obj)

		axios.post('/api/auth/forgotPassword', data).then(response=>{
			console.log(response);
			forgotPasswordForm.style.visibility = 'hidden'

		})
	})
})

