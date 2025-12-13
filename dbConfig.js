var mysql = require('mysql')
var conn = mysql.createPool({
  connectionLimit: 10,
  host:
    process.env.DB_HOST || 'mysql-2509f5c6-rcbaruelo1029-f8fe.l.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'defaultdb',
  port: process.env.DB_PORT || 12264,
  ssl: {
    rejectUnauthorized: false,
  },
})

module.exports = conn
