const connection = require("../../config");

const createCommentQuery = ({ body, userId, postId }) => {
  const sql = {
    text: `INSERT INTO comments (body, user_id, post_id) VALUES ($1, $2, $3) RETURNING *`,
    values: [body, userId, postId],
  };
  return connection.query(sql);
};

// const createDummyData = () => {
//   const bodyList = [
//     "test one",
//     "test two",
//     "test three",
//     "test four",
//     "test five",
//     "test six",
//     "test seven",
//   ];

//   const userIdList = [1, 2, 3, 4, 5, 6, 7];
//   const postIdList = [1, 2, 3, 4, 5, 6, 7];

//   for (let i = 0; i < 7; i++) {
//     createCommentQuery({
//       body: bodyList[i],
//       userId: userIdList[i],
//       postId: postIdList[i],
//     })
//       .then((data) => {
//         console.log(data.rows[0]);
//       })
//       .catch((error) => console.log(error));
//   }
// };
// createDummyData();

const getCommentsByPostIdQuery = ({ page, postId }) => {
  const limit = 10;
  const offset = page * limit - limit;

  const sqlQuery = `
  SELECT
      c.id,
      u.username,
      c.body,
      c.user_id
  FROM comments c
      JOIN users u ON u.id = c.user_id
  WHERE c.post_id = $1
  GROUP BY
      c.id,
      u.username,
      c.body,
      c.user_id
  ORDER BY id DESC LIMIT $2 OFFSET $3
  `;

  const sql = {
    text: sqlQuery,
    values: [postId, limit, offset],
  };
  return connection.query(sql);
};

module.exports = {
  createCommentQuery,
  getCommentsByPostIdQuery,
};
