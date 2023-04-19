const postsRouter = require('express').Router();
const { createPost, getUserPosts, getPosts, deletePost, getPost,countryPosts,namePosts,getSubredditNames,createSubreddit,getSubredditPosts } = require('../../controller/posts');
const auth = require('../../helper/auth');

postsRouter.post('/', auth, createPost);
postsRouter.delete('/:postId', auth, deletePost);
postsRouter.get('/user', auth, getUserPosts);
postsRouter.get('/:postId', auth, getPost);
postsRouter.get('/', getPosts);
// postsRouter.get('/subreddits', createSubreddit);
postsRouter.get('/postCountry/:country',auth, countryPosts);
postsRouter.get('/postname/:postname',auth, namePosts);
postsRouter.get('/subreddits/names', getSubredditNames);
postsRouter.post('/subreddit',auth, createSubreddit);
postsRouter.get('/rooms/:subreditTitle',getSubredditPosts)


module.exports = postsRouter;