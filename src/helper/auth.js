const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err) {
              res.json({ message: "Error" })
          } else {
              req.mytoken = decoded;
              next()
          }
      })
  } else {
      res.json("error")
  }
}

module.exports = auth