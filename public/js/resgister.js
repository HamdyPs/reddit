const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpForm = document.getElementById('signUpForm');
const signinForm = document.getElementById('signinForm');
const signUpMsg = document.querySelector('.signUpMsg');
const toast = document.querySelector('.toast');
const wholetoast = document.querySelector('.wholetoast');
const signinResponse = document.querySelector('.signinResponse');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signUpForm.addEventListener('submit', (e) => {
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
		.then(result => result.json()).then((data) => {
			signUpMsg.textContent = data.data.data

		})
		.catch(console.log)
})
signinForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const obj = new FormData(signinForm);
	const data = Object.fromEntries(obj)
	console.log(data);
	if (data.username === '' || data.password === '') {
		toastError(data)
		return

	} else if (data.username === '' && data.password === '') {
		toastError(data)
		return
	} else {
		fetch('/api/users/signin', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(() => signinResponse.textContent = 'welcome to our website')
			.catch(console.log)
	}

})

const toastError = (data) => {
	const div = document.createElement('div')
	div.classList.add('toast')

	const p = document.createElement('p')
	p.classList.add('para-toast')
	if (data.username === '' && data.password === '') {
		p.textContent = 'write your username and password, please!'

	} else if (data.username === '') {
		p.textContent = 'write your username, please!'
	} else {
		p.textContent = 'write your password, please!'
	}

	div.appendChild(p)
	wholetoast.appendChild(div)

	div.style.visibility = 'visible'
	div.style.transform = 'translateX(0px)'

	setTimeout(() => {
		div.style.visibility = 'hidden'
		div.style.transform = 'translateX(-300px)'
		wholetoast.removeChild(div)
	}, 3500)
}