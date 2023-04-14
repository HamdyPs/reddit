const postsRouter = require('express').Router();
const {createPost} = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/post',auth,createPost);

module.exports = postsRouter;