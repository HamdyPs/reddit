const connection = require("../../config");

const createUserRoleQuery = ({ userId, subredditId }) => {
  const sql = {
    text: `INSERT INTO user_roles (user_id, subreddit_id) VALUES ($1, $2) RETURNING *`,
    values: [userId, subredditId],
  };
  return connection.query(sql);
};

module.exports = {
  createUserRoleQuery,
};
