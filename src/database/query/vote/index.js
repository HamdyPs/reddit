const connection = require("../../config");

const getVoteQuery = ({ postId, userId }) => {
  const sql = {
    text: `SELECT * FROM votes WHERE post_id = $1 AND user_id = $2`,
    values: [postId, userId],
  };
  return connection.query(sql);
};

const createVoteQuery = ({ vote, postId, userId }) => {
  const sql = {
    text: `INSERT INTO votes (vote, post_id, user_id) VALUES ($1, $2, $3) RETURNING *`,
    values: [vote, postId, userId],
  };
  return connection.query(sql);
};

const updateVoteQuery = ({ vote, postId, userId }) => {
  const sql = {
    text: `UPDATE votes SET vote = $1 WHERE post_id = $2 AND user_id = $3 RETURNING *`,
    values: [vote, postId, userId],
  };
  return connection.query(sql);
};
const deleteVoteQuery = ({ postId, userId }) => {
  const sql = {
    text: `DELETE FROM votes WHERE post_id = $1 AND user_id = $2 RETURNING *`,
    values: [postId, userId],
  };
  return connection.query(sql);
};

module.exports = {
  createVoteQuery,
  deleteVoteQuery,
  getVoteQuery,
  updateVoteQuery,
};
