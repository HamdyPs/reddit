
const createPostBtn = document.querySelector('.createPost')
const selectPost = document.querySelector('.selectPost')
const userCreatePostDiv = document.querySelector('.userCreatePostDiv')
const createPostForm = document.querySelector('.createPostForm')


//    userNameProfile.textContent = post.username;
// userNameAcoount.textContent = post.username;


axios.get(`/api/posts/user`).then(response => {
  console.log(response.data);
  createPost(response.data)
})


createPostBtn.addEventListener('click',()=>{
  userCreatePostDiv.style.display = 'block'

  const selectElement = document.createElement('select');
  selectElement.classList.add('inputFields');
  selectElement.setAttribute('name', 'subredditTitle');
  selectDiv(selectElement)
  selectPost.appendChild(selectElement)

})

createPostForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const obj = new FormData(createPostForm);
	const data = Object.fromEntries(obj)

  console.log(data);
  axios.post('/api/posts/', data)

  axios.get(`/api/posts/user`).then(response => {
    createPost(response.data)
  })
  

  userCreatePostDiv.style.display = 'none'

})

const selectDiv =(selectElement)=>{

  axios.get('/api/posts/subreddits/names').then(data=>{
    data.data.forEach(sub=>{
      const optionElement = document.createElement('option');
    optionElement.textContent = sub.subreddittitle;
    selectElement.appendChild(optionElement);
    })
   
  })
}