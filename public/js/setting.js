const username = document.querySelector('.username');
const email = document.querySelector('.email');
const photo = document.querySelector('.photo');
const date = document.querySelector('.date');
const country = document.querySelector('.country');
const phone = document.querySelector('.phone');
const address = document.querySelector('.address');
axios.get('/api/users/sitting').then(response=>{
  username.value = response.data[0].username;
  email.value = response.data[0].email;
  photo.value = response.data[0].photo;
  date.value = response.data[0].date;
  country.value = response.data[0].country;
  phone.value = response.data[0].phone;
  address.value = response.data[0].address;
})

