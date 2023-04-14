const postsRouter = require('express').Router();
const {createPost, getUserPosts,getPosts} = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/',auth,createPost);
postsRouter.get('/:userId',auth,getUserPosts);
postsRouter.get('/',getPosts);

module.exports = postsRouter;