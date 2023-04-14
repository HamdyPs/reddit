const connection = require('../../config');


const createPostQuery = (userData,mytoken) => {
  const {title, description, photo} = userData;
  const userId = mytoken.providerID
  const sql = {
    text: `INSERT INTO posts (title, description, photo, user_id)
     VALUES ($1 , $2, $3, $4)`,
    values: [title, description, photo,userId]
  }

  return connection.query(sql)
};


const getPostQuery = (mytoken) => {
  const userId = mytoken.providerID

  const sql = {
    text: `select 
            p.title,
            p.description,
            p.photo,
            u.photo,
            u.username,
            p.created_at
          from posts p 
          join users u
            on u.id = p.user_id
          where u.id = $1`,
    values: [userId]
  };
  return connection.query(sql);
};


module.exports = {createPostQuery,getPostQuery}