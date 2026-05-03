const mysql = require('mysql2');
require('dotenv').config();

const c = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

c.connect((err) => {
  if (err) { console.log('Error: ' + err.message); process.exit(1); }

  // Create budgets table with unique constraint on user+month
  c.query(`
    CREATE TABLE IF NOT EXISTS budgets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      month VARCHAR(7) NOT NULL,
      amount DECIMAL(12, 2) NOT NULL,
      UNIQUE KEY unique_user_month (user_id, month),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) console.log('budgets table error: ' + err.message);
    else console.log('budgets table OK');
    c.end();
  });
});
