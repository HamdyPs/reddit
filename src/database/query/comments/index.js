const connection = require('../../config');


const createCommentQuery = (description, userId, postId) => {

  const sql = {
    text: `INSERT INTO comments ( description, user_id, post_id)
     VALUES ($1 , $2, $3 )`,
    values: [description, userId, postId]
  }

  return connection.query(sql)
};

module.exports = { createCommentQuery }