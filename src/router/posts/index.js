const postsRouter = require('express').Router();
const { createPost, getUserPosts, getPosts, deletePost, getPost,countryPosts,namePosts,getRoomPosts } = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/', auth, createPost);
postsRouter.delete('/:postId', auth, deletePost);
postsRouter.get('/user', auth, getUserPosts);
postsRouter.get('/:postId', auth, getPost);
postsRouter.get('/', getPosts);
postsRouter.get('/room/:room', getRoomPosts);
postsRouter.get('/postCountry/:country', countryPosts);
postsRouter.get('/postname/:postname', namePosts);

module.exports = postsRouter;