const postgres = require('postgres')
const fs = require('node:fs')

const publicKey = fs.readFileSync(__dirname + '/Aiven-PgSQL.pem', {
  encoding: 'utf8'
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let sql
let ssl

if (process.env.DB_USE_SSL === 'true') {
  ssl = { ca: publicKey, rejectUnauthorized: true }
}

if (process.env.DB_STRING_CONFIG === 'true') {
  sql = postgres(process.env.DB_STRING_URI, { ssl })
} else {
  sql = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    db: process.env.DB_NAME,
    ssl
  })
}

module.exports = sql
