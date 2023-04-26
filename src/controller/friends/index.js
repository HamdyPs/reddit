const {
  getFriendshipQuery,
  deleteFriendshipQuery,
  createFriendshipQuery,
  acceptFriendQuery,
  deleteFriendshipById,
  getFriendshipByIdQuery,
  getFriendRequestsQuery,
  getFriendsQuery,
} = require("../../database/query/friend");

const getFriends = (req, res, next) => {
  const { id } = req.user;

  getFriendsQuery({ id })
    .then((data) => {
      res.status(200).json({
        friends: data.rows,
      });
    })
    .catch((error) => next(error));
};

const friendshipEvent = (req, res, next) => {
  const { id } = req.user;
  const { friendId } = req.params;

  if (id === parseInt(friendId)) {
    return res.status(400).json({
      message: "You can't be friends with yourself",
    });
  }

  getFriendshipQuery({ id, friendId })
    .then((data) => {
      if (data.rows.length > 0) {
        deleteFriendshipQuery({ id, friendId })
          .then((friendData) => {
            res.status(200).json({
              message: "Friend removed successfully",
              friend: friendData.rows[0],
            });
          })
          .catch((error) => next(error));
      } else {
        createFriendshipQuery({ id, friendId })
          .then((friendData) => {
            res.status(200).json({
              message: "Friend added successfully",
              friend: friendData.rows[0],
            });
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
};

const respondToFriendship = (req, res, next) => {
  const { id } = req.user;
  console.log(id);

  const { friendshipId, accept } = req.body;

  getFriendshipByIdQuery({ friendshipId, userId: id })
    .then((data) => {
      if (data.rows.length === 0) {
        return res.status(404).json({
          message: "Friendship not found",
        });
      }

      if (accept) {
        acceptFriendQuery({
          friendshipId,
          userId: id,
        })
          .then(() => {
            res.status(200).json({
              message: "Friendship accepted",
            });
          })
          .catch((error) => next(error));
      } else {
        deleteFriendshipById({
          friendshipId,
          userId: id,
        })
          .then(() => {
            res.status(200).json({
              message: "Friendship rejected",
            });
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
};

const getFriendRequests = (req, res, next) => {
  const { id } = req.user;

  getFriendRequestsQuery({ id })
    .then((data) => {
      res.status(200).json({
        message: "Friend requests fetched successfully",
        requests: data.rows,
      });
    })
    .catch((error) => next(error));
};

module.exports = {
  friendshipEvent,
  respondToFriendship,
  getFriendRequests,
  getFriends,
};
