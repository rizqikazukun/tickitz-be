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
const cinemaErrorHandler = require('../middlewares/cinemaErrorHandler')

// ENDPOINT MOVIES
router.get('/movies', getMovies, movieErrorHandler)
router.get('/movies/:id', getDetailMovie, movieErrorHandler)
router.post('/movies', auth, addMovie, movieErrorHandler)
router.post('/movies/imdb', auth, addMovieByImdb, movieErrorHandler)
router.put('/movies/:id', auth, updateMovie, movieErrorHandler)
router.delete('/movies/:id', auth, deleteMovie, movieErrorHandler)

// ENDPOINT CINEMAS
router.get('/cinemas', getCinemas, cinemaErrorHandler)
router.get('/cinemas/:id', getSpesificCinema, cinemaErrorHandler)
router.post('/cinemas', auth, addCinemas, cinemaErrorHandler)
router.put('/cinemas/:id', auth, updateCinema, cinemaErrorHandler)
router.delete('/cinemas/:id', auth, deleteCinema, cinemaErrorHandler)

// ENDPOINT USERS
router.post('/users/register', UsersController.userRegister, userErrorHandler)
router.post('/users/login', UsersController.loginUser, userErrorHandler)
router.get('/users', auth, UsersController.getListUser, userErrorHandler)
router.get('/users/me', auth, UsersController.getDetailUser, userErrorHandler)
router.put('/users/edit', auth, UsersController.updateUser, userErrorHandler)

router.put(
  '/users/edit/email',
  auth,
  UsersController._updateUserEmail,
  userErrorHandler
)

router.put(
  '/users/edit/password',
  auth,
  UsersController.updateUserPassword,
  userErrorHandler
)

module.exports = router
