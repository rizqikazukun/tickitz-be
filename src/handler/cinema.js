/* eslint-disable camelcase */
const sql = require('../database/pgConnection')

const getCinemas = async (req, res) => {
  try {
    const cinemas = await sql`SELECT * FROM cinemas`

    if (cinemas.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
        data: cinemas
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: cinemas
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

const getSpesificCinema = async (req, res) => {
  try {
    const { id } = req.params

    if (typeof Number(id) !== typeof Number()) {
      res.status(404).json({
        success: false,
        message: 'Bad Input, please insert proper id'
      })
      return
    }

    const cinemas = await sql`SELECT * FROM cinemas WHERE id=${id}`

    if (cinemas.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
        data: cinemas
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: cinemas
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

const addCinemas = async (req, res) => {
  try {
    const { movie_id, name, city, address, show_times, price, logo } = req.body

    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Bad Input'
      })
      return
    }

    const cinemas = await sql`
        insert into cinemas
          (movie_id, name, city, address, show_times, price, logo)
        values
          (${movie_id},${name},${city},${address},${show_times},${price},${logo})
        returning id`

    res.status(200).json({
      success: true,
      message: 'Data inserted',
      data: cinemas
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

module.exports = { getCinemas, getSpesificCinema, addCinemas }
