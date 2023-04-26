const path = require("path");

const router = require("express").Router();

router.get("/signin", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../public/components/client/signin.html")
  );
});

module.exports = router;
