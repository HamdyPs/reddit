const {
  createPostQuery,
  getPostsQuery,
  getPostsBySubredditQuery,
  getPostsByUserQuery,
  getPostByIdQuery,
  getPostByCountryQuery,
  deletePostQuery,
} = require("../../database/query/posts");

const createPost = (req, res, next) => {
  const { title, body, subredditId, image } = req.body;
  const { id } = req.user;

  createPostQuery({ title, body, userId: id, subredditId, image })
    .then((data) => {
      res.status(201).json({
        message: "Post created successfully",
        post: data.rows[0],
      });
    })
    .catch((error) => next(error));
};

const getPosts = (req, res, next) => {
  const { page = 1 } = req.query;

  getPostsQuery({ page })
    .then((data) => {
      res.status(200).json({
        message: "Posts retrieved successfully",
        posts: data.rows,
      });
    })
    .catch((error) => next(error));
};

const getPostsBySubreddit = (req, res, next) => {
  const { page = 1 } = req.query;
  const { subredditId } = req.params;

  getPostsBySubredditQuery({ page, subredditId })
    .then((data) => {
      res.status(200).json({
        message: "Posts retrieved successfully",
        posts: data.rows,
      });
    })
    .catch((error) => next(error));
};

const getPostsByUser = (req, res, next) => {
  const { page = 1 } = req.query;
  const { userId } = req.params;

  getPostsByUserQuery({ page, userId })
    .then((data) => {
      res.status(200).json({
        message: "Posts retrieved successfully",
        posts: data.rows,
      });
    })
    .catch((error) => next(error));
};

const getPostById = (req, res, next) => {
  const { postId } = req.params;


  getPostByIdQuery({ postId })
    .then((data) => {
      res.status(200).json({
        message: "Post retrieved successfully",
        post: data.rows[0],
      });
    })
    .catch((error) => next(error));
};

const getPostByCountry = (req, res,next) => {
  const { country } = req.params;
  const { page = 1 } = req.query;


  getPostByCountryQuery({ country, page }).then(data => {
    res.status(200).json({
      message: "Post retrieved successfully",
      post: data.rows,
    });
  })
  .catch((error) => console.log(error));
}

const deletePost = (req, res,next)=>{
  const postId = req.params.postId;

  deletePostQuery(postId).then(data=> res.status(200).json({
    message: 'your post has deleted successfully'
  }))
  .catch(error=>next(error))
}

module.exports = {
  createPost,
  getPosts,
  getPostsBySubreddit,
  getPostsByUser,
  getPostById,
  getPostByCountry,
  deletePost,
};
