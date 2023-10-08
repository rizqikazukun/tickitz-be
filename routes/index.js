const router = require('express').Router()

const {
  getMovies,
  getDetailMovie,
  addMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies')

const {
  getCinemas,
  getSpesificCinema,
  addCinemas,
  updateCinema,
  deleteCinema
} = require('../controllers/cinemas')

const UsersController = require('../controllers/users')
const { addMovieByImdb } = require('../controllers/omdb')
const auth = require('../middlewares/jwtAuth')
const userErrorHandler = require('../middlewares/userErrorHandler')
const movieErrorHandler = require('../middlewares/movieErrorHandler')

// ENDPOINT MOVIES
router.get('/movies', getMovies, movieErrorHandler)
router.get('/movies/:id', getDetailMovie, movieErrorHandler)
router.post('/movies', auth, addMovie, movieErrorHandler)
router.post('/movies/imdb', auth, addMovieByImdb, movieErrorHandler)
router.put('/movies/:id', auth, updateMovie, movieErrorHandler)
router.delete('/movies/:id', auth, deleteMovie, movieErrorHandler)

// ENDPOINT CINEMAS
router.get('/cinemas', getCinemas)
router.get('/cinemas/:id', getSpesificCinema)
router.post('/cinemas', auth, addCinemas)
router.put('/cinemas/:id', auth, updateCinema)
router.delete('/cinemas/:id', auth, deleteCinema)

// ENDPOINT USERS
router.post('/users/register', UsersController.userRegister, userErrorHandler)
router.post('/users/login', UsersController.loginUser, userErrorHandler)
router.get('/users', auth, UsersController.getListUser, userErrorHandler)
router.get('/users/me', auth, UsersController.getDetailUser, userErrorHandler)
router.put('/users/edit', auth, UsersController.updateUser, userErrorHandler)
router.put(
  '/users/edit/password',
  auth,
  UsersController.updateUserPassword,
  userErrorHandler
)

module.exports = router
