const router = require("express").Router();
const {
  createPost,
  getPosts,
  getPostsBySubreddit,
  getPostsByUser,
  getPostById,
  getPostByCountry,
  deletePost,
} = require("../../controller/posts");
const { auth } = require("../../helper/auth");

router.get("/subreddit/:subredditId", getPostsBySubreddit);
router.get("/country/:country", getPostByCountry);
router.get("/user/:userId", getPostsByUser);

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:postId", getPostById);
router.delete("/:postId",auth, deletePost);

module.exports = router;
