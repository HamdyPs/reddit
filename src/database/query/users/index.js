const connection = require('../../config');


const signUpUserQuery = (userData) => {
  const { username, email, password, photo, date, country, role, phone, address } = userData;

  const sql = {
    text: `INSERT INTO users (username, email ,password ,photo, date, country, role, phone,address)
     VALUES ($1 , $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: [username, email, password, photo, date, country, role, phone, address]
  }

  return connection.query(sql)
};
const signInUserQuery = (userData) => {
  const { username } = userData;

  const sql = {
    text: `SELECT id,username, email,password, photo FROM users where username=$1`,
    values: [username]
  }

  return connection.query(sql)
};
const getUserQuery = (userId) => {

  const sql = {
    text: `SELECT id,username, email,password, photo, date, country, phone, address FROM users where users.id = $1`,
    values: [userId]
  }

  return connection.query(sql)
};



module.exports = { signUpUserQuery, signInUserQuery,getUserQuery };