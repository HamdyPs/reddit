// const postSchema = require('../../schema/posts.schema')
const { createPostQuery, getPostQuery } = require('../../database/query/posts')
const createPost = (req, res) => {
  const { title, description, photo } = req.body;
  const { user } = req;
  createPostQuery({ title, description, photo }, user).then(() => res.json('your post has created succssfully'))
}

const getUserPosts = (req, res) => {
  const userId = req.params.userId

  getPostQuery(userId)
    .then((data) => {
      console.log(data.rows);
      res.status(200).json(data.rows)
    })
}

const getPosts = (req, res) => {
  getPostQuery()
    .then((data) => {
      res.status(200).json(data.rows)
    })
}

module.exports = { createPost, getUserPosts, getPosts }