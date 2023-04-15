const { createCommentQuery } = require('../../database/query/comments')

const createComment = (req, res) => {
  const description = req.body.description;
  const { user } = req;
  const postId = req.params.postId;

  createCommentQuery(description, user.providerID, postId).then(() => res.json('your comment has created succssfully'))
}


module.exports = { createComment }