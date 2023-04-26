const { Pool } = require("pg");

const { DB_URL,DATABASE, NODE_ENV } = process.env;

const option = {
  connectionString: NODE_ENV === 'production' ? DATABASE : DB_URL,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

const connection = new Pool(option);

module.exports = connection;
