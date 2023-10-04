const router = require('express').Router()

const { getMovies, getDetailMovie, addMovie, updateMovie, deleteMovie } = require('../controllers/movies')
const { getCinemas, getSpesificCinema, addCinemas, updateCinema, deleteCinema } = require('../controllers/cinemas')
const Users = require('../controllers/users')
const { addMovieByImdb } = require('../controllers/omdb')

// ENDPOINT MOVIES
router.get('/movies', getMovies)
router.get('/movies/:id', getDetailMovie)
router.post('/movies', addMovie)
router.post('/movies/imdb', addMovieByImdb)
router.put('/movies/:id', updateMovie)
router.delete('/movies/:id', deleteMovie)

// ENDPOINT CINEMAS
router.get('/cinemas', getCinemas)
router.get('/cinemas/:id', getSpesificCinema)
router.post('/cinemas', addCinemas)
router.put('/cinemas/:id', updateCinema)
router.delete('/cinemas/:id', deleteCinema)

// ENDPOINT USERS
router.post('/users', Users.addUser)

module.exports = router