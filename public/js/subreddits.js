console.log('hello');
console.log(window.location.href.split('http://localhost:4000/api/users/subreddits/')[1]);
const subredditTitle = window.location.href.split('http://localhost:4000/api/users/subreddits/')[1]
axios.get(`/api/posts/rooms/${subredditTitle}`).then(response=>{
  createPost(response.data);
})