const { createCommentQuery,addVoteQuery } = require('../../database/query/comments')

const createComment = (req, res) => {
  const description = req.body.description;
  const { user } = req;
  const postId = req.params.postId;

  createCommentQuery(description, user.providerID, postId).then(() => res.json('your comment has created succssfully'))
}
const addVoteToComment = (req, res) => {
  const { user } = req;
  const postId = req.params.postId;

  addVoteQuery(user.providerID, postId).then((result)=>{
    console.log(result);
    res.status(202).json('u have been liked this post')
  })
}


module.exports = { createComment,addVoteToComment }