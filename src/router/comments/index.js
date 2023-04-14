const commentsRouter = require('express').Router();
const {createComment} = require('../../controller/comments')

commentsRouter.post('/:userId/:postId', createComment)

module.exports = commentsRouter;