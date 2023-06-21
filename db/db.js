const mysql = require('mysql2')

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

db.connect(function (err) {
  if (err) throw (err);
  console.log("Connected to the db!")
})

module.exports = db;



