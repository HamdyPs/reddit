const postId = location.pathname.split("/")[2];
const postsContainer = document.querySelector("#main-posts-list");
const commentForm = document.querySelector(".commentForm");

commentForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const obj = new FormData(commentForm);
  const data = Object.fromEntries(obj)
  console.log(data.comment);
  axios.post(`/api/comment/${postId}`,{body:data.comment}).then(response=>{
    console.log(response);
    getPostComments(postId)
  })

})


const getPostComments = (postId) => {
  axios
    .get(`/api/comment/${postId}`)
    .then(({ data }) => {
  
     renderComments(data.comments);

    })
    .catch((err) => console.log(err));
};

const getPosts = () => {
  axios
    .get(`/api/post/${postId}`)
    .then(({ data }) => {
      console.log(data);
      const postCard = renderPost(data.post);
      postsContainer.appendChild(postCard);

      getPostComments(data.post.id);
    })
    .catch((err) => console.log(err));
};

getPosts();
