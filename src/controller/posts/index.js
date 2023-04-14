// const postSchema = require('../../schema/posts.schema')
const { createPostQuery, getPostQuery } = require('../../database/query/posts')
const createPost = (req, res) => {
  const { title, description, photo } = req.body;
  const { mytoken } = req;
  createPostQuery({ title, description, photo })
  .then(()=> res.json('your post has created successfully'))
  .catch(console.log)
  // getPostQuery(mytoken)
  //   .then((data) => {
  //     console.log(data);
  //     res.status(200).json(data.rows)
  //   })
}

module.exports = { createPost }