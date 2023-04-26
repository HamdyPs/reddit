const router = require("express").Router();

const {
  creatSubreddit,
  getSubreddits,
} = require("../../controller/subreddit");
const { auth } = require("../../helper/auth");

router.post("/", auth, creatSubreddit);
router.get("/", getSubreddits);

module.exports = router;
