const postsRouter = require('express').Router();
const { createPost, getUserPosts, getPosts, deletePost, getPost } = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/', auth, createPost);
postsRouter.delete('/:postId', auth, deletePost);
postsRouter.get('/user/:userId', auth, getUserPosts);
postsRouter.get('/:postId', auth, getPost);
postsRouter.get('/', getPosts);

module.exports = postsRouter;