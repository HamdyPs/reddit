const path = require("path");

const router = require("express").Router();

router.get("/post/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/components/client/post.html"));
});

module.exports = router;
