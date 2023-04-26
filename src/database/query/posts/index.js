const connection = require("../../config");

const createPostQuery = ({ title, body, userId, subredditId, image }) => {
  const sql = {
    text: `INSERT INTO posts (title, body, user_id, subreddit_id, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    values: [title, body, userId, subredditId, image],
  };
  return connection.query(sql);
};

// const createDummyData = () => {
//   const titles = ["one", "two", "three", "four", "give", "six", "seven"];
//   const body = [
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.1",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.2",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.3",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.4",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.5",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.6",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.7",
//   ];

//   const users = [1, 2, 3, 4, 5, 6, 7];
//   const subreddits = [1, 2, 3, 4, 5, 6, 7];

//   for (let i = 0; i < 7; i++) {
//     createPostQuery({
//       title: titles[i],
//       body: body[i],
//       userId: users[i],
//       subredditId: subreddits[i],
//       // image,
//     });
//   }
// };

// createDummyData();

const getPostsQuery = ({ page }) => {
  const limit = 10;
  const offset = page * limit - limit;

  const sqlQuery = `
  SELECT 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id,
      p.created_at,
      COALESCE(SUM(CASE WHEN v.vote = TRUE THEN 1 ELSE 0 END), 0) AS upvotes,
      COALESCE(SUM(CASE WHEN v.vote = FALSE THEN 1 ELSE 0 END), 0) AS downvotes,
      COALESCE(COUNT(DISTINCT c.id), 0) AS comments_count
  FROM 
      posts p
      JOIN users u ON u.id = p.user_id
      LEFT JOIN votes v ON v.post_id = p.id
      LEFT JOIN comments c ON c.post_id = p.id
  GROUP BY 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id
      ORDER BY id DESC LIMIT $1 OFFSET $2
  `;
  const sql = {
    text: sqlQuery,
    values: [limit, offset],
  };
  return connection.query(sql);
};

const getPostsBySubredditQuery = ({ page, subredditId }) => {
  const limit = 10;
  const offset = page * limit - limit;

  const sqlQuery = `
  SELECT 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id,
      p.created_at,
      COALESCE(SUM(CASE WHEN v.vote = TRUE THEN 1 ELSE 0 END), 0) AS upvotes,
      COALESCE(SUM(CASE WHEN v.vote = FALSE THEN 1 ELSE 0 END), 0) AS downvotes,
      COALESCE(COUNT(DISTINCT c.id), 0) AS comments_count
  FROM 
      posts p
      JOIN users u ON u.id = p.user_id
      LEFT JOIN votes v ON v.post_id = p.id
      LEFT JOIN comments c ON c.post_id = p.id
  WHERE
      p.subreddit_id = $1
  GROUP BY 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id
      ORDER BY id DESC LIMIT $2 OFFSET $3
    `;

  const sql = {
    text: sqlQuery,
    values: [subredditId, limit, offset],
  };
  return connection.query(sql);
};
const getPostByCountryQuery = ({ page, country }) => {
  const limit = 10;
  const offset = page * limit - limit;

  const sqlQuery = `
  SELECT 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id,
      p.created_at, 
      COALESCE(SUM(CASE WHEN v.vote = TRUE THEN 1 ELSE 0 END), 0) AS upvotes,
      COALESCE(SUM(CASE WHEN v.vote = FALSE THEN 1 ELSE 0 END), 0) AS downvotes,
      COALESCE(COUNT(DISTINCT c.id), 0) AS comments_count
  FROM 
      posts p
      JOIN users u ON u.id = p.user_id
      LEFT JOIN votes v ON v.post_id = p.id
      LEFT JOIN comments c ON c.post_id = p.id
  WHERE
      u.country = $1
  GROUP BY 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id
      ORDER BY id DESC LIMIT $2 OFFSET $3
    `;

  const sql = {
    text: sqlQuery,
    values: [country, limit, offset],
  };
  return connection.query(sql);
};

const getPostsByUserQuery = ({ page, userId }) => {
  const limit = 10;
  const offset = page * limit - limit;

  const sqlQuery = `
  SELECT 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id,
      p.created_at, 
      COALESCE(SUM(CASE WHEN v.vote = TRUE THEN 1 ELSE 0 END), 0) AS upvotes,
      COALESCE(SUM(CASE WHEN v.vote = FALSE THEN 1 ELSE 0 END), 0) AS downvotes,
      COALESCE(COUNT(DISTINCT c.id), 0) AS comments_count
  FROM 
      posts p
      JOIN users u ON u.id = p.user_id
      LEFT JOIN votes v ON v.post_id = p.id
      LEFT JOIN comments c ON c.post_id = p.id
  WHERE
      p.user_id = $1
  GROUP BY 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id
      ORDER BY id DESC LIMIT $2 OFFSET $3
    `;

  const sql = {
    text: sqlQuery,
    values: [userId, limit, offset],
  };
  return connection.query(sql);
};

const getPostByIdQuery = ({ postId }) => {
  const sqlQuery = `
  SELECT 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id,
      p.created_at, 
      COALESCE(SUM(CASE WHEN v.vote = TRUE THEN 1 ELSE 0 END), 0) AS upvotes,
      COALESCE(SUM(CASE WHEN v.vote = FALSE THEN 1 ELSE 0 END), 0) AS downvotes,
      COALESCE(COUNT(DISTINCT c.id), 0) AS comments_count
  FROM 
      posts p
      JOIN users u ON u.id = p.user_id
      LEFT JOIN votes v ON v.post_id = p.id
      LEFT JOIN comments c ON c.post_id = p.id
  WHERE
      p.id = $1
  GROUP BY 
      p.id, 
      u.username, 
      u.email, 
      p.title, 
      p.body, 
      p.image, 
      p.subreddit_id, 
      p.user_id
`;

  const sql = {
    text: sqlQuery,
    values: [postId],
  };
  return connection.query(sql);
};

const deletePostQuery = (postId) => {
  const sqlQuery = `delete from posts where posts.id = $1`;

  const sql = {
    text: sqlQuery,
    values: [postId],
  };
  return connection.query(sql);
};

module.exports = {
  createPostQuery,
  getPostsQuery,
  getPostsBySubredditQuery,
  getPostsByUserQuery,
  getPostByIdQuery,
  getPostByCountryQuery,
  deletePostQuery,
};
