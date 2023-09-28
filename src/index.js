/* eslint-disable camelcase */
const express = require('express')
const { getMovies, getDetailMovie, addMovie, addMovieByImdb } = require('./handler/movies')
const { default: helmet } = require('helmet')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.APP_PORT | 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.get('/movies', getMovies)
app.get('/movies/:id', getDetailMovie)
app.post('/movies', addMovie)
app.post('/movies/imdb', addMovieByImdb)

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
