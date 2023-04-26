const router = require("express").Router();
const {
  createComment,
  getCommentsByPostId,
} = require("../../controller/comments");
const { auth } = require("../../helper/auth");

router.post("/:postId", auth, createComment);
router.get("/:postId", getCommentsByPostId);

module.exports = router;
