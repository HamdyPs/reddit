const connection = require("../../config");

const getFriendshipQuery = ({ id, friendId }) => {
  const sql = {
    text: `SELECT * FROM friendship WHERE user_id = $1 AND friend_id = $2`,
    values: [id, friendId],
  };

  return connection.query(sql);
};

const getFriendRequestsQuery = ({ id }) => {
  const joinUsers =
    "SELECT  users.id, users.username, users.photo, friendship.status,friendship.id FROM friendship INNER JOIN users ON friendship.user_id = users.id WHERE friend_id = $1 AND status = 'pending'";
  const sql = {
    text: joinUsers,
    values: [id],
  };

  return connection.query(sql);
};

const getFriendsQuery = ({ id }) => {
  console.log(id);
  const joinUsers =
    "SELECT  users.username, users.photo, friendship.status FROM friendship INNER JOIN users ON friendship.user_id = users.id WHERE (friend_id = $1 or user_id = $1) AND status = 'approved'";
  const sql = {
    text: joinUsers,
    values: [id],
  };

  return connection.query(sql);
};

const getFriendshipByIdQuery = ({ friendshipId, userId }) => {
  const sql = {
    text: `SELECT * FROM friendship WHERE id = $1 AND friend_id = $2`,
    values: [friendshipId, userId],
  };

  return connection.query(sql);
};

const createFriendshipQuery = ({ id, friendId }) => {
  const sql = {
    text: `INSERT INTO friendship (user_id, friend_id) VALUES ($1, $2) RETURNING *`,
    values: [id, friendId],
  };

  return connection.query(sql);
};

const deleteFriendshipQuery = ({ id, friendId }) => {
  const sql = {
    text: `DELETE FROM friendship WHERE user_id = $1 AND friend_id = $2 RETURNING *`,
    values: [id, friendId],
  };

  return connection.query(sql);
};

const deleteFriendshipById = ({ friendshipId, userId }) => {
  const sql = {
    text: `DELETE FROM friendship WHERE id = $1 AND user_id = $2 RETURNING *`,
    values: [friendshipId, userId],
  };

  return connection.query(sql);
};

const acceptFriendQuery = ({ friendshipId, userId }) => {
  const sql = {
    text: `UPDATE friendship SET status = 'approved' WHERE id = $1 AND friend_id = $2 RETURNING *`,
    values: [friendshipId, userId],
  };

  return connection.query(sql);
};

module.exports = {
  getFriendshipQuery,
  getFriendshipByIdQuery,
  getFriendRequestsQuery,
  createFriendshipQuery,
  deleteFriendshipQuery,
  acceptFriendQuery,
  deleteFriendshipById,
  getFriendsQuery,
};
