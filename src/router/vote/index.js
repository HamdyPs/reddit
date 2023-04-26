const router = require("express").Router();
const { createVote } = require("../../controller/vote");
const { auth } = require("../../helper/auth");

router.post("/", auth, createVote);

module.exports = router;
