const router = require("express").Router();

const authRoutes = require("./user");
const subredditRoutes = require("./subreddit");
const postRoutes = require("./posts");
const voteRoutes = require("./vote");
const commentRoutes = require("./comments");
const friendRoutes = require("./friend");
const { auth } = require("../helper/auth");

router.use("/auth", authRoutes);
router.use("/subreddit", subredditRoutes);
router.use("/post", postRoutes);
router.use("/vote", voteRoutes);
router.use("/comment", commentRoutes);
router.use("/friend", auth, friendRoutes);

module.exports = router;
