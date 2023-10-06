const router = require('express').Router()

const {
  getMovies,
  getDetailMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies')

const {
  getCinemas,
  getSpesificCinema,
  addCinemas,
  updateCinema,
  deleteCinema,
} = require('../controllers/cinemas')

const UsersController = require('../controllers/users')
const { addMovieByImdb } = require('../controllers/omdb')
const auth = require('../middlewares/jwtAuth')

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
router.get('/users', auth, UsersController.getListUser)
router.get('/users/me', auth, UsersController.getDetailUser)
router.post('/users/register', UsersController.userRegister)
router.post('/users/login', UsersController.loginUser)
router.put('/users/edit', UsersController.updateUser)
router.put('/users/edit/password', UsersController.updateUserPassword)

module.exports = router
