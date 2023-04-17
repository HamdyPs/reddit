axios.get(`/api/posts/user/`).then(response => {
  createPost(response.data)
})