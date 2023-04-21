const connection = require('../../config');


const signUpUserQuery = (userData) => {
  const { username, email, password, photo, date, country, role, phone, address,question,answer } = userData;

  const sql = {
    text: `INSERT INTO users (username, email ,password ,photo, date, country, role, phone,address,question,answer)
     VALUES ($1 , $2, $3, $4, $5, $6, $7, $8, $9,$10,$11)`,
    values: [username, email, password, photo, date, country, role, phone, address,question,answer]
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

  let userDataQuery = `SELECT id,username, email,password, photo, date, country, phone, address FROM users`
  if(userId){
    userDataQuery += ` where users.id = $1`
  }

  const sql = {
    text: userDataQuery,
    values: userId ? [userId] : []
  }

  return connection.query(sql)
};
const getUserDataQuery = (email) => {

  let userDataQuery = `SELECT id,username, email,password, photo, date, country, phone, address,question,answer FROM users WHERE users.email = $1`

  const sql = {
    text: userDataQuery,
    values: [email]
  }

  return connection.query(sql)
};

const forgotPasswordQuery = (newPassword,email)=>{
  const sql = {
    text: `update users set password = $1 where users.email = $2`,
    values: [newPassword,email]
  }

  return connection.query(sql)
}

const updateUserQuery = ({ username, email, photo, date, country, phone, address }, userId) => {

  const sql = {
    text: `update users set
    username = $1,
    email = $2,
    photo = $3,
    date = $4,
    country = $5,
    phone = $6,
    address = $7
    where id = $8`,
    values: [username, email, photo, date, country, phone, address, userId]
  }

  return connection.query(sql)
}
const updatePasswordQuery = ( newPassword , userId) => {

  const sql = {
    text: `update users set
    password = $1
    where id = $2`,
    values: [newPassword, userId]
  }

  return connection.query(sql)
}

const addFriendQuery = (userId,friendId)=>{
  let addFriendQuery = 'insert into friends (user_id,friend_id) values ($1,$2)'

  const sql ={
    text:addFriendQuery,
    values:[userId,friendId]
  }

  return connection.query(sql)

}



module.exports = { signUpUserQuery, signInUserQuery, getUserQuery,getUserDataQuery, updateUserQuery,updatePasswordQuery,addFriendQuery,forgotPasswordQuery };