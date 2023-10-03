/* eslint-disable camelcase */
const express = require('express')
const { getMovies, getDetailMovie, addMovie, updateMovie, deleteMovie } = require('./handler/movies')
const { default: helmet } = require('helmet')
const { addMovieByImdb } = require('./handler/omdb')
const { getCinemas, getSpesificCinema, addCinemas, updateCinema, deleteCinema } = require('./handler/cinemas')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.APP_PORT | 3000

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }))

// ENDPOINT MOVIES
app.get('/movies', getMovies)
app.get('/movies/:id', getDetailMovie)
app.post('/movies', addMovie)
app.post('/movies/imdb', addMovieByImdb)
app.put('/movies/:id', updateMovie)
app.delete('/movies/:id', deleteMovie)

// ENDPOINT CINEMA
app.get('/cinemas', getCinemas)
app.get('/cinemas/:id', getSpesificCinema)
app.post('/cinemas', addCinemas)
app.put('/cinemas/:id', updateCinema)
app.delete('/cinemas/:id', deleteCinema)


app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
