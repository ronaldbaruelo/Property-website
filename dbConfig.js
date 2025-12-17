const mysql = require('mysql2/promise')
const fs = require('fs')

let pool = null

function buildConfig() {
  const config = {
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || '60000', 10),
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'propertydb',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  }

  // SSL handling: SSL_CA_PATH or SSL_CA env; SSL_REJECT_UNAUTHORIZED optional
  const sslOptions = {}
  if (process.env.SSL_CA_PATH) {
    try {
      sslOptions.ca = fs.readFileSync(process.env.SSL_CA_PATH, 'utf8')
    } catch (e) {
      console.error('Failed to read SSL_CA_PATH:', process.env.SSL_CA_PATH, e.message)
    }
  } else if (process.env.SSL_CA) {
    sslOptions.ca = process.env.SSL_CA.replace(/\\n/g, '\n')
  }

  if (Object.keys(sslOptions).length > 0) {
    if (process.env.SSL_REJECT_UNAUTHORIZED !== undefined) {
      sslOptions.rejectUnauthorized = process.env.SSL_REJECT_UNAUTHORIZED === 'true'
    } else {
      sslOptions.rejectUnauthorized = false
    }
    config.ssl = sslOptions
  }

  return config
}

function createPool() {
  const cfg = buildConfig()
  pool = mysql.createPool(cfg)
  return pool
}

async function getPool() {
  if (!pool) createPool()
  return pool
}

async function query(sql, params) {
  const p = await getPool()
  try {
    const [rows] = await p.query(sql, params)
    return rows
  } catch (err) {
    // If pool experienced a fatal error, recreate it for future requests
    if (err && (err.fatal || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR' || err.code === 'ETIMEDOUT')) {
      try {
        pool && pool.end && (await pool.end())
      } catch (e) {}
      pool = null
    }
    throw err
  }
}

module.exports = { query, getPool, createPool }
