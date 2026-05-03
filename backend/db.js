const mysql = require('mysql2');
require('dotenv').config();

const config = process.env.MYSQL_URL || {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
};

const pool = mysql.createPool(typeof config === 'string' ? config : {
  ...config,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false // Often required for cloud databases
  }
});

const promisePool = pool.promise();

// Attempt to query to check connection
promisePool.query('SELECT 1')
  .then(() => {
    console.log('MySQL connected successfully.');
  })
  .catch((err) => {
    console.error('MySQL connection failed: ', err.message);
  });

module.exports = promisePool;
