const commentsRouter = require('express').Router();
const { createComment,addVoteToComment, getVotePost,getComments,deleteVotePost } = require('../../controller/comments')
const auth = require('../../helper/auth');

commentsRouter.post('/:postId',auth, createComment)
//still need to fix vote issue, stop error when add vote to post which is not exist

commentsRouter.get('/user/:postId',auth, addVoteToComment)
//still need to fix vote issue, make user make 1 vote 

commentsRouter.get('/:postId', getVotePost)
commentsRouter.delete('/:postId',auth, deleteVotePost)
commentsRouter.get('/post/:postId', getComments)

module.exports = commentsRouter;