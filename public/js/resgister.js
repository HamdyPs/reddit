const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpForm = document.getElementById('signUpForm');
const signinForm = document.getElementById('signinForm');
const signUpMsg = document.querySelector('.signUpMsg');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signUpForm.addEventListener('submit', (e)=>{
	e.preventDefault()
  const obj = new FormData(signUpForm);
  const data = Object.fromEntries(obj)
	fetch('/api/users/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(result => result.json()).then((data)=>{
			signUpMsg.textContent = data.data.data
			
		})
    .catch(console.log)
})
signinForm.addEventListener('submit', (e)=>{
	e.preventDefault()
  const obj = new FormData(signinForm);
  const data = Object.fromEntries(obj)
	fetch('/api/users/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    // .then(result => result.json()).then(data=>window.location.href = "/")
    // .catch(console.log)
})