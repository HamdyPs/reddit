const userData = JSON.parse(localStorage.getItem("userData"));
const userSettings = document.querySelector('.userSettings');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const photo = document.querySelector('.photo');
const date = document.querySelector('.date');
const country = document.querySelector('.country');
const phone = document.querySelector('.phone');
const address = document.querySelector('.address');
const changePasswordForm = document.querySelector('.changePasswordForm');
const uncheckedIcon = document.querySelectorAll('.fa-user-pen');
const checkedIcon = document.querySelectorAll('.fa-user-check');
const userNameAcoount = document.querySelector('.userNameAcoount')
const profileuser = document.querySelector('.profileuser')

userSettings.addEventListener('click',()=>{
  userSettings.href = `/setting/${userData.id}`
})

axios.get('/api/auth/userdata').then(response => {
  username.value = response.data.data.username;
  email.value = response.data.data.email;
  photo.value = response.data.data.photo;
  country.value = response.data.data.country;
})

uncheckedIcon.forEach(icon => {
  icon.addEventListener('click', () => {

    username.removeAttribute('disabled')
    email.removeAttribute('disabled')
    photo.removeAttribute('disabled')
    country.removeAttribute('disabled')

  })

})

checkedIcon.forEach(icon => {

  icon.addEventListener('click', () => {
    username.setAttribute('disabled', true)
    email.setAttribute('disabled', true)
    photo.setAttribute('disabled', true)
    country.setAttribute('disabled', true)
    const data = {
      username: username.value,
      email: email.value,
      photo: photo.value,
      country: country.value,
    }
    axios.put('/api/auth/', data)
  })
})


changePasswordForm.addEventListener('submit', (e) => {

  e.preventDefault()
  const obj = new FormData(changePasswordForm);
  const data = Object.fromEntries(obj)
  if(data.password === '' || data.newPassword === ''){
    return 
  }else{
    axios.put('/api/auth/resetPassword', data).then(response => console.log(response))

  }

})
