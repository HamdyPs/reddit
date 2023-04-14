const jwt = require('jsonwebtoken')
const signToken = (providerName, userId) => new Promise((resolve, reject) => {
  jwt.sign({ providerName, providerID: userId }, process.env.SECRET_KEY, (err, token) => {
    if (err) {
      return reject(err);
    }
    return resolve(token);
  });
});

module.exports = signToken