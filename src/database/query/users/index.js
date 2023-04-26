const connection = require("../../config");

const getUserByUsernameQuery = ({ username }) => {
  const sql = {
    text: `SELECT * FROM users WHERE username = $1 LIMIT 1`,
    values: [username],
  };
  return connection.query(sql);
};

const getUserByIdQuery = ({ userId }) => {
  const sql = {
    text: `SELECT * FROM users WHERE id = $1 LIMIT 1`,
    values: [userId],
  };
  return connection.query(sql);
};
const getUserByEmailQuery = (email) => {
  const sql = {
    text: `SELECT * FROM users WHERE email = $1 LIMIT 1`,
    values: [email],
  };
  return connection.query(sql);
};

const updateUserQuery = ({ username, email, photo, country }, { userId }) => {
  console.log({ username, email, photo, country }, { userId });

  const sql = {
    text: `update users set
    username = $1,
    email = $2,
    photo = $3,
    country = $4
    where id = $5`,
    values: [username, email, photo, country, userId]
  }

  return connection.query(sql)
}

const updatePasswordQuery = (hashPassword, { userId }) => {

  const sql = {
    text: `update users set
    password = $1
    where id = $2`,
    values: [hashPassword, userId]
  }

  return connection.query(sql)
}

const forgotPasswordQuery = (hashPassword,email)=>{
  const sql = {
    text: `update users set password = $1 where users.email = $2`,
    values: [hashPassword,email]
  }

  return connection.query(sql)
}

const getUserQuestionsQuery = ()=>{
  const sql = {
    text: `SELECT users.question FROM users`,
  };
  return connection.query(sql);
}

module.exports = {
  getUserByUsernameQuery,
  getUserByIdQuery,
  updateUserQuery,
  updatePasswordQuery,
  forgotPasswordQuery,
  getUserByEmailQuery,
  getUserQuestionsQuery,
};
