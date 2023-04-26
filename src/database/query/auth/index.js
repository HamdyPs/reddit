const connection = require("../../config");

const signupQuery = ({
  username,
  password,
  email,
  photo,
  country,
  question,
  answer,
}) => {
  const sql = {
    text: `INSERT INTO users (username, password, email, photo, country,question,answer) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING id, username, email, photo, country`,
    values: [username, password, email, photo, country, question, answer],
  };

  return connection.query(sql);
};

module.exports = {
  signupQuery,
};
