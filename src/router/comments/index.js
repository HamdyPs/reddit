const commentsRouter = require('express').Router();
const { createComment, getComments } = require('../../controller/comments')
const auth = require('../../helper/auth');

commentsRouter.post('/:postId',auth, createComment)

module.exports = commentsRouter;