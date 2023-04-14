const connection = require('../../config');


const createCommentQuery = (description, userId, postId) => {
  console.log(description);
  const sql = {
    text: `INSERT INTO comments
     ( description, user_id, post_id)
     VALUES ($1 , $2, $3 )`,
    values: [description, userId, postId]
  }

  return connection.query(sql)
};

const getCommentsQuery = (postId) => {
  let query = `select
  c.description,
  u.username,
  u.photo,
  c.user_id,
  c.post_id
  from comments c
  join users u
  on c.user_id = u.id
  join posts p
  on c.user_id = p.id
  `
  
  if (postId) {
    query += ` where p.id = $1`
  }
  const sql = {
    text: query,
    values: postId? [postId] : []
  }

  return connection.query(sql)
};


module.exports = { createCommentQuery, getCommentsQuery }