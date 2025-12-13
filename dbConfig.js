var mysql = require('mysql')
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'propertydb',
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'propertydb',
  port: process.env.DB_PORT || 3306
})

conn.connect(function (err) {
  if (err) {
    console.error('Database connection failed:', err)
    return
  }
  console.log('Connected to the database')
})

module.exports = conn
