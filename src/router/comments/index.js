const commentsRouter = require('express').Router();
const { createComment,addVoteToComment } = require('../../controller/comments')
const auth = require('../../helper/auth');

commentsRouter.post('/:postId',auth, createComment)
commentsRouter.get('/:postId',auth, addVoteToComment)

module.exports = commentsRouter;