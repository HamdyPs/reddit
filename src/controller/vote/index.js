const {
  getVoteQuery,
  createVoteQuery,
  deleteVoteQuery,
  updateVoteQuery,
} = require("../../database/query/vote");

const createVote = (req, res, next) => {
  const { vote, postId } = req.body;
  const { id } = req.user;

  getVoteQuery({ postId, userId: id })
    .then((data) => {
      if (data.rows.length) {
        const currentVote = data.rows[0].vote;
        if (currentVote === vote) {
          deleteVoteQuery({ postId, userId: id })
            .then(() => {
              return res.status(200).json({
                message: "Vote deleted successfully",
              });
            })
            .catch((error) => next(error));
        } else {
          updateVoteQuery({ vote, postId, userId: id })
            .then((data) => {
              return res.status(200).json({
                message: "Vote updated successfully",
                vote: data.rows[0],
              });
            })
            .catch((error) => next(error));
        }
      } else {
        createVoteQuery({ vote, postId, userId: id })
          .then((data) => {
            return res.status(201).json({
              message: "Vote created successfully",
              vote: data.rows[0],
            });
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
};

module.exports = {
  createVote,
};
