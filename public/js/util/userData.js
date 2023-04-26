const profileUser = document.querySelector(".profileUser");
const userDatas = JSON.parse(localStorage.getItem('userData'))
const userAcountName = document.querySelector(".userAcountName");
const navloginbtn = document.querySelector("#nav-login-btn");
const navlogoutbtn = document.querySelector("#nav-logout-btn");
const accesstoken = document.cookie.split('=')[1];

if(accesstoken){
  userAcountName.textContent = userDatas.username
  profileUser.addEventListener('click', () => {
    profileUser.href = `/profile/${userDatas.id}`
  })
  navloginbtn.style.display = 'none'
  navlogoutbtn.style.display = 'block'
  navlogoutbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    axios.get('/api/auth/logout')
    window.location.replace('/')
  })
}else{
  navloginbtn.style.display = 'block'
  navlogoutbtn.style.display = 'none'

}

