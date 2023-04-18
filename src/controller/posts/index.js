// const postSchema = require('../../schema/posts.schema')
const { createPostQuery, getPostsQuery, deletePostQuery, getPostQuery, commentQuery,countryPostsQuery } = require('../../database/query/posts')
const createPost = (req, res) => {
  
  const { title, description, photo } = req.body;
  const { user } = req;
  createPostQuery({ title, description, photo }, user).then(() => res.json('your post has created succssfully'))
}

const getUserPosts = (req, res) => {
  const { user } = req;

  getPostsQuery(user.providerID)
    .then((data) => {
      res.status(200).json(data.rows)
    })
}

const getPost = (req, res) => {
  const postId = req.params.postId

  getPostQuery(postId)
    .then((postData) => {
      commentQuery(postId).then((commentsData) => {
        if (postData.rowCount > 0) {
          postData.rows[0].comments = commentsData.rows
          res.status(200).json(postData.rows[0])
        } else {
          res.status(404).json('post doesnt exist')
        }

      })
        .catch((error) => {
          console.log(error);
        })
    })
    .catch((error) => {
      console.log(error);
    })
}

const getPosts = (req, res) => {
  getPostsQuery()
    .then((data) => {
      res.status(200).json(data.rows)
    })
}

const countryPosts = (req, res)=>{
  const country = req.params.country

  countryPostsQuery(country).then(data=>{
    if(data.rowCount > 0){
      res.status(200).json(data.rows)
      return
    }
    res.status(401).json('there is no posts from this country')
  })
}
const namePosts = (req, res)=>{
  const postName = req.params.postname

  console.log(postName);

  countryPostsQuery(postName).then(data=>{
    console.log(data.rows);
    if(data.rowCount > 0){
      res.status(200).json(data.rows)
      return
    }
    res.status(401).json('there is no posts with this name')
  })
}

const deletePost = (req, res) => {
  const postId = req.params.postId
  deletePostQuery(postId)
    .then(() => res.status(200).json({
      message: 'your post has deleted succssfully'
    }))
}

module.exports = { createPost, getUserPosts, getPosts, deletePost, getPost,countryPosts,namePosts }