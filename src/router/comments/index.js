const commentsRouter = require('express').Router();
const { createComment, getComments } = require('../../controller/comments')
const auth = require('../../helper/auth');

commentsRouter.post('/:userId/:postId',auth, createComment)
commentsRouter.get('/:postId', auth,getComments)

module.exports = commentsRouter;