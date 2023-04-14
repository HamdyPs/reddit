const postsRouter = require('express').Router();
const {createPost} = require('../../controller/posts')
postsRouter.post('/post',createPost);

module.exports = postsRouter;