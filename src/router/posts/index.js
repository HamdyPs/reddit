const postsRouter = require('express').Router();
const { createPost, getUserPosts, getPosts, deletePost, getPost,countryPosts } = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/', auth, createPost);
postsRouter.delete('/:postId', auth, deletePost);
postsRouter.get('/user/:userId', auth, getUserPosts);
postsRouter.get('/:postId', auth, getPost);
postsRouter.get('/', getPosts);
postsRouter.get('/postCountry/:country', countryPosts);

module.exports = postsRouter;