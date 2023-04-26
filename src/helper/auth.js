const jwt = require("jsonwebtoken");
const { getUserByIdQuery } = require("../database/query/users");

const auth = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({
      message: "You are not authorized to access this route",
    });
  }

  const userId = jwt.verify(accessToken, process.env.JWT_SECRET);

  getUserByIdQuery({ userId })
    .then((data) => {
      if (!data.rows.length) {
        return res.status(401).json({
          message: "You are not authorized to access this route",
        });
      }

      req.user = {
        id: data.rows[0].id,
        username: data.rows[0].username,
        email: data.rows[0].email,
      };

      next();
    })
    .catch((error) => next(error));
};

module.exports = { auth };
