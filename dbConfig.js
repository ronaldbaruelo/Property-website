var mysql = require('mysql')
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'propertydb',
})

conn.connect(function (err) {
  if (err) {
    console.error('Database connection failed:', err)
    return
  }
  console.log('Connected to the database')
})

module.exports = conn
