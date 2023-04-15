// const postSchema = require('../../schema/posts.schema')
const { createPostQuery, getPostsQuery, deletePostQuery, getPostQuery, commentQuery } = require('../../database/query/posts')
const createPost = (req, res) => {
  const { title, description, photo } = req.body;
  const { user } = req;
  createPostQuery({ title, description, photo }, user).then(() => res.json('your post has created succssfully'))
}

const getUserPosts = (req, res) => {
  const userId = req.params.userId

  getPostsQuery(userId)
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

const deletePost = (req, res) => {
  const postId = req.params.postId
  deletePostQuery(postId)
    .then(() => res.status(200).json({
      message: 'your post has deleted succssfully'
    }))
}

module.exports = { createPost, getUserPosts, getPosts, deletePost, getPost }