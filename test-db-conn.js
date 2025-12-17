const db = require('./dbConfig')

;(async () => {
  console.log('Running DB connection test (db.query SELECT 1)...')
  try {
    const rows = await db.query('SELECT 1 as ok')
    console.log('Connected successfully:', rows)
    process.exit(0)
  } catch (err) {
    console.error('Connection error (detailed):')
    console.error(err)
    process.exit(1)
  }
})()
