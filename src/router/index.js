const userRouter = require('./user');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const apiRouter = require('./apis');
// const { clientError, serverError } = require('../controller/error/error');

const router = require('express').Router();

router.use('/users', userRouter)
router.use('/posts', postsRouter)
router.use('/comments', commentsRouter)
router.use('/apis', apiRouter)
// router.use(clientError);
// router.use(serverError);

module.exports = router