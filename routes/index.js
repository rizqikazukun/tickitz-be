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
const adminAuth = require('../middlewares/jwtAuthAdmin')

// INDEX
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'api running well'
  })
})

// ENDPOINT MOVIES
router.get('/movies', getMovies, movieErrorHandler)
router.get('/movies/:id', getDetailMovie, movieErrorHandler)
router.post('/movies', adminAuth, addMovie, movieErrorHandler)
router.post('/movies/imdb', adminAuth, addMovieByImdb, movieErrorHandler)
router.put('/movies/:id', adminAuth, updateMovie, movieErrorHandler)
router.delete('/movies/:id', adminAuth, deleteMovie, movieErrorHandler)

// ENDPOINT CINEMAS
router.get('/cinemas', getCinemas, cinemaErrorHandler)
router.get('/cinemas/:id', getSpesificCinema, cinemaErrorHandler)
router.post('/cinemas', adminAuth, addCinemas, cinemaErrorHandler)
router.put('/cinemas/:id', adminAuth, updateCinema, cinemaErrorHandler)
router.delete('/cinemas/:id', adminAuth, deleteCinema, cinemaErrorHandler)

// ENDPOINT USERS
router.post('/users/login', UsersController.loginUser, userErrorHandler)
router.post('/users/register', UsersController.userRegister, userErrorHandler)

router.get('/users', adminAuth, UsersController.getListUser, userErrorHandler)

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
