const postsRouter = require('express').Router();
const { createPost, getUserPosts, getPosts, deletePost, getPost,countryPosts,namePosts } = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/', auth, createPost);
postsRouter.delete('/:postId', auth, deletePost);
postsRouter.get('/user', auth, getUserPosts);
postsRouter.get('/:postId', auth, getPost);
postsRouter.get('/', getPosts);
// postsRouter.get('/subreddits', createSubreddit);
postsRouter.get('/postCountry/:country', countryPosts);
postsRouter.get('/postname/:postname', namePosts);

module.exports = postsRouter;