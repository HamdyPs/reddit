const {createCommentQuery, getCommentsQuery} = require('../../database/query/comments')

const createComment = (req, res) => {
  const description = req.body.description;
  const userId = req.params.userId;
  const postId = req.params.postId;

  createCommentQuery(description,userId,postId).then(result=>res.json('your comment has created succssfully'))
}
const getComments = (req, res) => {
  const postId = req.params.postId
  getCommentsQuery(postId).then(data=>{res.json(data.rows)})
}

module.exports = {createComment, getComments}