const connection = require("../../config");

const createSubredditQuery = ({ userId, name, description }) => {
  const sql = {
    text: `INSERT INTO subreddits (creator, name, description) VALUES ($1, $2, $3) RETURNING id, creator, name, description`,
    values: [userId, name, description],
  };

  return connection.query(sql);
};

// const createDummyData = () => {
//   const users = [1, 2, 3, 4, 5, 6, 7];
//   const subredditNames = [
//     "funny",
//     "pics",
//     "gaming",
//     "AskReddit",
//     "worldnews",
//     "aww",
//     "todayilearned",
//   ];

//   for (let i = 0; i < 7; i++) {
//     createSubredditQuery({
//       userId: users[i],
//       description: "",
//       name: subredditNames[i],
//     });
//   }
// };

// createDummyData();

const getSubredditsQuery = ({ page }) => {
  const limit = 10;
  const offset = page * limit - limit;

  const sql = {
    text: `SELECT * FROM subreddits ORDER BY id DESC LIMIT $1 OFFSET $2`,
    values: [limit, offset],
  };
  return connection.query(sql);
};

module.exports = {
  createSubredditQuery,
  getSubredditsQuery,
};
