const path = require("path");

const router = require("express").Router();

router.get("/user/:id", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../public/components/client/user.html")
  );
});

module.exports = router;
