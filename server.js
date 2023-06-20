const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'ipitythefool',
    database: 'employees_db'
  },
  console.log(`Connected to the database.`)
);

// Queries

// selects all departments
const departmentsQuery = db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });

// 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });