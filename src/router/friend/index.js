const {
  friendshipEvent,
  respondToFriendship,
  getFriendRequests,
  getFriends,
} = require("../../controller/friends");

const router = require("express").Router();

router.get("/", getFriends);
router.get("/requests",getFriendRequests);
router.post("/response",respondToFriendship);
router.post("/:friendId", friendshipEvent);

module.exports = router;
