const connection = require('../../config');


const createCommentQuery = (content, userId, postId) => {

  const sql = {
    text: `INSERT INTO comments
     ( content, user_id, post_id)
     VALUES ($1 , $2, $3 )`,
    values: [content, userId, postId]
  }

  return connection.query(sql)
};
const addVoteQuery = ( userId, postId) => {
  const sql = {
    text: `INSERT INTO votes
     (user_id, post_id)
     VALUES ($1 , $2)`,
    values: [userId, postId]
  }

  return connection.query(sql)
};

const votePostQuery = (postId) => {
  let voteQuery = `select
  u.username,
  u.photo,
  v.user_id,
  v.post_id
    from votes v
    join users u
    on v.user_id = u.id
    where v.post_id = $1`
  const voteSql = {
    text: voteQuery,
    values: [postId]
  }
  return connection.query(voteSql)
}
const deleteVoteQuery = (postId,userId) => {
  
  let removevote = `DELETE FROM votes where votes.user_id = $1 and votes.post_id = $2`
  const voteSql = {
    text: removevote,
    values: [userId,postId]
  }
  return connection.query(voteSql)
}

const getCommentsQuery = (postId)=>{
  let commentQuery = `select
c.content,
c.user_id,
c.post_id,
c.created_at,
p.id,
u.username
from comments c
join posts p 
on p.id = c.post_id
join users u
on u.id = c.user_id
where p.id = $1`
  const commentSql = {
    text: commentQuery,
    values: [postId]
  }
  return connection.query(commentSql)
}


module.exports = { createCommentQuery, addVoteQuery, votePostQuery,getCommentsQuery,deleteVoteQuery }