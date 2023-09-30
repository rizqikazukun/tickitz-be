/* eslint-disable camelcase */
const sql = require('../database/pgConnection')

const getMovies = async (req, res) => {
  try {
    const { search, year } = req.query

    const movies = await sql`SELECT id, name, ${!year || year === '' ? sql`` : sql`release_date,`} duration, genres, poster FROM movies
    ${!search || search === '' ? sql`` : sql`where lower(name) like lower(${String('%') + search + String('%')})`}
    ${!year || year === '' ? sql`order by id` : year === 'desc' ? sql`order by release_date desc` : year === 'asc' ? sql`order by release_date asc` : sql`order by id`}`

    if (movies.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
        data: movies
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: movies
    })
  } catch (error) {
    console.log(error)
    res.status(502).json({
      success: false,
      message: 'Bad Gateway',
      data: []
    })
  }
}

const getDetailMovie = async (req, res) => {
  try {
    const { id } = req.params

    if (typeof Number(id) !== typeof Number()) {
      res.status(404).json({
        success: false,
        message: 'Bad Input, please insert proper id'
      })
      return
    }

    const movies = await sql`SELECT * FROM movies WHERE id=${id}`

    if (movies.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
        data: movies
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: movies
    })
  } catch (error) {
    console.log(error)
    res.status(502).json({
      success: false,
      message: 'Bad Gateway',
      data: []
    })
  }
}

const addMovie = async (req, res) => {
  try {
    const { name, release_date, duration, genres, directed_by, casts, synopsis, poster } = req.body

    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Bad Input'
      })
      return
    }

    const movies = await sql`
      insert into movies
        (name, release_date, duration, genres, directed_by, casts, synopsis, poster)
      values
        (${name}, ${release_date},${duration},${genres},${directed_by},${casts},${synopsis},${poster} )
      returning id`

    res.status(200).json({
      success: true,
      message: 'Data inserted',
      data: movies
    })
  } catch (error) {
    console.log(error)
    res.status(502).json({
      success: false,
      message: 'Bad Gateway',
      data: []
    })
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

module.exports = { getMovies, getDetailMovie, addMovie }
