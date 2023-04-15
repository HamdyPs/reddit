const connection = require('../../config');


const createPostQuery = (postData, user) => {

  const { title, description, photo } = postData;
  const userId = user.providerID
  const sql = {
    text: `INSERT INTO posts (title, description, photo, user_id)
     VALUES ($1 , $2, $3, $4)`,
    values: [title, description, photo, userId]
  }

  return connection.query(sql)
};


const getPostsQuery = (userId) => {
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


const getPostQuery = (postId) => {
  let query = `select 
  p.id,
  p.title,
  p.description,
  p.photo,
  u.photo,
  u.username,
  p.created_at,
  p.user_id
from posts p 
join users u
  on u.id = p.user_id
  where p.id = $1`


  const sql = {
    text: query,
    values: [postId]
  };


  return connection.query(sql);
};

const commentQuery = (postId) => {
  let commentsQuery = `select
  c.description,
  c.user_id,
  u.username,
  u.photo
  from comments c
  join users u
  on c.user_id = u.id
  where c.post_id = $1`
  const commentSql = {
    text: commentsQuery,
    values: [postId]
  }
  return connection.query(commentSql)
}

const deletePostQuery = (postId) => {
  const sql = {
    text: `DELETE FROM posts where posts.id = $1`,
    values: [postId]
  }
  return connection.query(sql);

}

module.exports = { createPostQuery, getPostsQuery: getPostsQuery, deletePostQuery, getPostQuery, commentQuery }