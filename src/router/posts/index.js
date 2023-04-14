const postsRouter = require('express').Router();
const {createPost, getUserPosts} = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/post',auth,createPost);
postsRouter.get('/post',auth,getUserPosts);

module.exports = postsRouter;