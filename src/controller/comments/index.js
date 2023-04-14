const {createCommentQuery} = require('../../database/query/comments')

const createComment = (req, res) => {
  const description = req.body;
  const userId = req.params.userId;
  const postId = req.params.postId;

  createCommentQuery(description,userId,postId).then(result=>res.json('your comment has created succssfully'))
}

module.exports = {createComment}