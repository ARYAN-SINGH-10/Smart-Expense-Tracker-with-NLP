const mysql = require('mysql2');

const c = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aryan'
});

c.connect((err) => {
  if (err) {
    console.log('Connection error: ' + err.message);
    process.exit(1);
  }
  console.log('Connected!');

  c.query('CREATE DATABASE IF NOT EXISTS expense_tracker', (err) => {
    if (err) { console.log('DB error: ' + err.message); process.exit(1); }
    console.log('Database ready.');

    c.query('USE expense_tracker', () => {
      c.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        )
      `, (err) => {
        if (err) { console.log('users table error: ' + err.message); }
        else { console.log('users table OK'); }

        c.query(`
          CREATE TABLE IF NOT EXISTS expenses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(100) NOT NULL,
            description VARCHAR(255),
            date DATE NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          )
        `, (err) => {
          if (err) { console.log('expenses table error: ' + err.message); }
          else { console.log('expenses table OK'); }
          c.end();
          console.log('Setup complete!');
        });
      });
    });
  });
});
