const {
  createSubredditQuery,
  getSubredditsQuery,
} = require("../../database/query/subreddit");
const { createUserRoleQuery } = require("../../database/query/role");

const creatSubreddit = (req, res, next) => {
  const { name, description } = req.body;
  const { id } = req.user;

  createSubredditQuery({ userId: id, name, description })
    .then((data) => {
      createUserRoleQuery({
        userId: id,
        subredditId: data.rows[0].id,
      })
        .then(() => {
          return res.status(201).json({
            message: "Subreddit created successfully",
            subreddit: data.rows[0],
          });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

const getSubreddits = (req, res, next) => {
  const { page = 1 } = req.query;

  getSubredditsQuery({ page })
    .then((data) => {
      res.status(200).json({
        message: "Subreddits retrieved successfully",
        subreddits: data.rows,
      });
    })
    .catch((error) => next(error));
};

module.exports = {
  creatSubreddit,
  getSubreddits,
};
