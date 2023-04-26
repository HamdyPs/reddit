const path = require("path");

const router = require("express").Router();

router.get("/register", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../public/components/client/register.html")
  );
});

module.exports = router;
