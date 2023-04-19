
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

axios.get('/api/users/sitting').then(response=>{
  console.log(response.data);
  userNameAcoount.textContent = response.data[0].username;

})

axios.get('/api/users/sitting').then(response => {
  username.value = response.data[0].username;
  email.value = response.data[0].email;
  photo.value = response.data[0].photo;
  date.value = response.data[0].date;
  country.value = response.data[0].country;
  phone.value = response.data[0].phone;
  address.value = response.data[0].address;
})

uncheckedIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    username.removeAttribute('disabled')
    email.removeAttribute('disabled')
    photo.removeAttribute('disabled')
    date.removeAttribute('disabled')
    country.removeAttribute('disabled')
    phone.removeAttribute('disabled')
    address.removeAttribute('disabled')
  })
})
checkedIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    username.setAttribute('disabled', true)
    email.setAttribute('disabled', true)
    photo.setAttribute('disabled', true)
    date.setAttribute('disabled', true)
    country.setAttribute('disabled', true)
    phone.setAttribute('disabled', true)
    address.setAttribute('disabled', true)
    const data = {
      username: username.value,
      email: email.value,
      photo: photo.value,
      date: date.value,
      country: country.value,
      phone: phone.value,
      address: address.value
    }
    axios.put('/api/users/update', data)


  })
})


changePasswordForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  const obj = new FormData(changePasswordForm);
	const data = Object.fromEntries(obj)
  console.log(data);
  axios.put('/api/users/resetPassword',data).then(response=>console.log(response))
})
