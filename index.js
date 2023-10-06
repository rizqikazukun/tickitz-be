/* eslint-disable camelcase */
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const { default: helmet } = require('helmet')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: 'localhost' }))
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }))

// Router
app.use(router)

const port = process.env.APP_PORT | 3000

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
