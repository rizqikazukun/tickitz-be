const postgres = require('postgres')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  db: process.env.DB_NAME
})

module.exports = sql
