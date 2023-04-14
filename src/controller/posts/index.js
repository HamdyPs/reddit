// const postSchema = require('../../schema/posts.schema')
const { createPostQuery, getPostQuery } = require('../../database/query/posts')
const createPost = (req, res) => {
  const { title, description, photo } = req.body;
  const { mytoken } = req;
  createPostQuery({ title, description, photo }, mytoken)

  getPostQuery(mytoken)
    .then((data) => {
      console.log(data.rows);
      res.status(200).json(data.rows)
    })
}

const getUserPosts = (req, res) =>{
  console.log('here');
  const { mytoken } = req;

  getPostQuery(mytoken)
  .then((data) => {
    console.log(data.rows);
    res.status(200).json(data.rows)
  })
}

module.exports = { createPost,getUserPosts }