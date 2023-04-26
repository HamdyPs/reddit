const path = require("path");

const router = require("express").Router();

router.get("/subreddit/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/components/client/subreddits.html"));
});

module.exports = router;
