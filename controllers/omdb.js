/* eslint-disable camelcase */
const sql = require('../utils/postgreConnection')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const addMovieByImdb = async (req, res) => {
  try {
    const { imdbId } = req.body

    if (!imdbId && typeof imdbId !== typeof String('')) {
      const result = {
        success: false,
        message: "Please insert imdbId, must be sting and can't be empty",
      }
      res.status(400).json(result)
      return
    }

    if (!process.env.OMDb_API_KEY) {
      const result = {
        success: false,
        message: 'Internal Application Error',
      }
      res.status(500).json(result)
      return
    }

    const fData = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDb_API_KEY}&plot=short`,
    )
    const jData = await fData.json()

    if (jData.Response === 'False') {
      const result = {
        success: false,
        message: jData.Error,
      }
      res.status(400).json(result)
      return
    }

    const { Title, Released, Runtime, Genre, Director, Actors, Plot, Poster } =
      jData
    const genre = Genre.split(', ')
    const casts = Actors.split(', ')

    const movies = await sql`
        insert into movies
          (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
        values
          (${Title}, ${new Date(
            Released,
          )},${Runtime},${genre},${Director},${casts},${Plot},${Poster} )
        returning id`
    const result = {
      success: true,
      message: 'Data inserted',
      data: movies,
    }
    return res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    const result = {
      success: false,
      message: 'Bad Gateway',
      data: [],
    }
    return res.status(502).json(result)
  }
}

module.exports = { addMovieByImdb }
