/* eslint-disable camelcase */
const sql = require('../database/pgConnection')

const getMovies = async (req, res) => {
  try {
    const { search, years } = req.query

    const movies = await sql`SELECT id, name, duration, genres, poster FROM movies
    ${!search || search === '' ? sql`` : search === '' ? sql`` : sql`where lower(name) like lower(${String('%') + search + String('%')})`}
    ${!years || years === '' ? sql`` : years === 'desc' ? sql`order by release_date desc` : years === 'asc' ? sql`order by release_date asc` : sql``}`

    // const movies = await sql`SELECT id, name, duration, genres, poster FROM movies
    // ${!years || years === '' ? sql`` : years === 'desc' ? sql`order by release_date desc` : sql`order by release_date asc`}`

    if (movies.length === 0) {
      const result = {
        success: false,
        message: 'Not Found',
        data: movies
      }
      res.status(404).json(result)
      return
    }

    const result = {
      success: true,
      message: 'OK',
      data: movies
    }
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    const result = {
      success: false,
      message: 'Bad Gateway',
      data: []
    }
    res.status(502).json(result)
  }
}

const getDetailMovie = async (req, res) => {
  try {
    const { id } = req.params

    if (typeof Number(id) !== typeof Number()) {
      const result = {
        success: false,
        message: 'Bad Input, please insert proper id'
      }
      res.status(404).jsonp(result)
      return
    }
    const movies = await sql`SELECT * FROM movies WHERE id=${id}`

    if (movies.length === 0) {
      const result = {
        success: false,
        message: 'Not Found',
        data: movies
      }
      res.status(404).jsonp(result)
      return
    }

    const result = {
      success: true,
      message: 'OK',
      data: movies
    }
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    const result = {
      success: false,
      message: 'Bad Gateway',
      data: []
    }
    res.status(502).json(result)
  }
}

const addMovie = async (req, res) => {
  try {
    const { name, release_date, duration, genres, directed_by, casts, synopsis, poster } = req.body

    if (!name) {
      const result = {
        success: false,
        message: 'Bad Input'
      }
      res.status(400).json(result)
      return
    }

    const movies = await sql`
      insert into movies
        (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
      values
        (${name}, ${release_date},${duration},${genres},${directed_by},${casts},${synopsis},${poster} )
      returning id`

    const result = {
      success: true,
      message: 'Data inserted',
      data: movies
    }
    res.status(200).json(result)
  } catch (error) {
    const result = {
      success: false,
      message: 'Bad Gateway',
      data: []
    }
    res.status(502).json(result)
  }
}

const addMovieByImdb = async (req, res) => {
  try {
    const { imdbId } = req.body

    if (!imdbId && typeof imdbId !== typeof String('')) {
      const result = {
        success: false,
        message: 'Please insert imdbId, must be sting and can\'t be empty'
      }
      res.status(400).json(result)
    }

    if (!process.env.OMDb_API_KEY) {
      const result = {
        success: false,
        message: 'Internal Application Error'
      }
      res.status(500).json(result)
    }

    const fData = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDb_API_KEY}&plot=short`)
    const jData = await fData.json()

    if (jData.Response === 'False') {
      const result = {
        success: false,
        message: jData.Error
      }
      res.status(400).json(result)
    }

    const { Title, Released, Runtime, Genre, Director, Actors, Plot, Poster } = jData
    const genre = Genre.split(', ')
    const casts = Actors.split(', ')

    const movies = await sql`
      insert into movies
        (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
      values
        (${Title}, ${new Date(Released)},${Runtime},${genre},${Director},${casts},${Plot},${Poster} )
      returning id`
    const result = {
      success: true,
      message: 'Data inserted',
      data: movies
    }
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    const result = {
      success: false,
      message: 'Bad Gateway',
      data: []
    }
    res.status(502).json(result)
  }
}

// const updateMovie = async (req, res) => {
//   try {
//     const { id, name, release_date, duration, genres, directed_by, casts, synopsis, poster } = req.body

//     if (!id) {
//       const result = {
//         success: false,
//         message: 'Bad Input, please insert proper id',
//         data: []
//       }
//       res.status(400).json(result)
//     }

//     const movies = await sql`update movies set
//     name=${name},
//     release_date=${release_date},
//     duration=${duration},
//     genres=${JSON.stringify(genres)},
//     directed_by=${directed_by},
//     casts=${JSON.stringify(casts)},
//     synopsis=${synopsis},
//     poster=${poster}
//     where id=${id} RETURNING id;`

//     const result = {
//       success: true,
//       message: 'Data Updated',
//       data: movies
//     }
//     console.log(result)
//     res.status(200).json(result)
//   } catch (error) {
//     console.log(error.message)
//     const result = {
//       success: false,
//       message: 'Internal Application Error',
//       data: []
//     }
//     return res.status(500).json(result)
//     // don't remove return or it will buggy
//   }
// }

module.exports = { getMovies, getDetailMovie, addMovie, addMovieByImdb }
