const postsRouter = require('express').Router();
const {createPost, getUserPosts,getPosts,deletePost} = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/',auth,createPost);
postsRouter.delete('/:postId',auth,deletePost);
postsRouter.get('/:userId',auth,getUserPosts);
postsRouter.get('/',getPosts);

module.exports = postsRouter;