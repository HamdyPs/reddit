const {
  createCommentQuery,
  getCommentsByPostIdQuery,
} = require("../../database/query/comments");

const createComment = (req, res, next) => {
  const { postId } = req.params;
  const { body } = req.body;
  const { id } = req.user;

  createCommentQuery({ body, userId: id, postId })
    .then((data) => {
      res.status(201).json({
        message: "Comment created successfully",
        comment: data.rows[0],
      });
    })
    .catch((error) => next(error));
};

const getCommentsByPostId = (req, res, next) => {
  const { page = 1 } = req.query;
  const { postId } = req.params;

  getCommentsByPostIdQuery({ page, postId })
    .then((data) => {
      res.status(200).json({
        message: "Comments retrieved successfully",
        comments: data.rows,
      });
    })
    .catch((error) => next(error));
};

module.exports = {
  createComment,
  getCommentsByPostId,
};
