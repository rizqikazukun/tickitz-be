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
router.post('/movies', auth, addMovie)
router.post('/movies/imdb', auth, addMovieByImdb)
router.put('/movies/:id', auth, updateMovie)
router.delete('/movies/:id', auth, deleteMovie)

// ENDPOINT CINEMAS
router.get('/cinemas', getCinemas)
router.get('/cinemas/:id', getSpesificCinema)
router.post('/cinemas', auth, addCinemas)
router.put('/cinemas/:id', auth, updateCinema)
router.delete('/cinemas/:id', auth, deleteCinema)

// ENDPOINT USERS

router.post('/users/register', UsersController.userRegister)
router.post('/users/login', UsersController.loginUser)
router.get('/users', auth, UsersController.getListUser)
router.get('/users/me', auth, UsersController.getDetailUser)
router.put('/users/edit', auth, UsersController.updateUser)
router.put('/users/edit/password', auth, UsersController.updateUserPassword)

module.exports = router
