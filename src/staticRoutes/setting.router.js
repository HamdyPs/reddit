const path = require("path");

const router = require("express").Router();

router.get("/setting/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/components/client/setting.html"));
});

module.exports = router;
