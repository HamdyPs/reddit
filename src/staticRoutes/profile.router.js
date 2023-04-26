const path = require("path");

const router = require("express").Router();

router.get("/profile/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/components/client/profile.html"));
});

module.exports = router;
