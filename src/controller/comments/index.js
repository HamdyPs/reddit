const { createCommentQuery, addVoteQuery, votePostQuery,getCommentsQuery,deleteVoteQuery } = require('../../database/query/comments')

const createComment = (req, res) => {
  const description = req.body.description;
  const { user } = req;
  const postId = req.params.postId;

  createCommentQuery(description, user.providerID, postId).then(() => res.json('your comment has created succssfully'))
}
const addVoteToComment = (req, res) => {
  const { user } = req;
  const postId = req.params.postId;

  addVoteQuery(user.providerID, postId).then((data) => {
    if (data.rowCount > 0) {
      res.status(200).json('u have been liked this post')

    } else {
      res.status(404).json('there is no post to like')

    }
  })
}

const getVotePost = (req, res) => {
  const postId = req.params.postId;

  votePostQuery(postId).then((voteData) => {
    if (voteData.rowCount > 0) {
      res.status(200).json({
        data: voteData.rows,
        voteCount: voteData.rowCount
      })
    } else {
      res.status(200).json({ msg: 'no like yet' })
    }

  })
    .catch((error) => {
      console.log(error);
    })
}

const deleteVotePost = (req, res)=>{
  const { user } = req;
  const postId = req.params.postId;

  deleteVoteQuery(postId,user.providerID).then(response=>{
    res.status(200).json('u have been deleted your vote succssfully')
  })
}

const getComments = (req, res) => {
  const postId = req.params.postId;
  getCommentsQuery(postId).then(data => res.status(200).json(data.rows))
}


module.exports = { createComment, addVoteToComment, getVotePost, getComments,deleteVotePost }