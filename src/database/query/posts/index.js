const connection = require('../../config');


const createPostQuery = (postData, user) => {

  const { title, description, photo } = postData;
  const userId = user.providerID
  console.log(userId);
  const sql = {
    text: `INSERT INTO posts (title, description, photo, user_id)
     VALUES ($1 , $2, $3, $4)`,
    values: [title, description, photo, userId]
  }

  return connection.query(sql)
};


const getPostQuery = (userId) => {
  let query = `select 
  p.title,
  p.description,
  p.photo,
  u.photo,
  u.username,
  p.created_at,
  p.user_id
from posts p 
join users u
  on u.id = p.user_id`

  if (userId) {
    query += ` where u.id = $1`
  }
  const sql = {
    text: query,
    values: userId ? [userId] : []
  };
  return connection.query(sql);
};


module.exports = { createPostQuery, getPostQuery }