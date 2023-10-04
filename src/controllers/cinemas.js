/* eslint-disable camelcase */
const sql = require('../databases/pgConnection')

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

const updateCinema = async (req, res) => {
  try {
    const { id } = req.params
    const { movie_id, name, city, address, show_times, price, logo } = req.body

    if (!id) {
      const result = {
        success: false,
        message: 'Bad Input, please insert proper id',
        data: []
      }
      res.status(400).json(result)
    }

    const movies = await sql`update cinemas set
    name=${name},
    movie_id=${movie_id},
    city=${city},
    address=${address},
    show_times=${show_times},
    price=${price},
    logo=${logo}
    where id=${id} RETURNING id;`

    const result = {
      success: true,
      message: 'Data Updated',
      data: movies
    }
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    const result = {
      success: false,
      message: 'Internal Application Error',
      data: []
    }
    return res.status(500).json(result)
    // don't remove return or it will buggy
  }
}


const deleteCinema = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      const result = {
        success: false,
        message: 'Bad Input, please insert proper id',
        data: []
      }
      res.status(400).json(result)
      return
    }

    const cinemas = await sql`DELETE FROM cinemas where id=${id} RETURNING id;`

    const result = {
      success: true,
      message: 'Data Deleted',
      data: cinemas
    }
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    const result = {
      success: false,
      message: 'Internal Application Error',
      data: []
    }
    return res.status(500).json(result)
    // don't remove return or it will buggy
  }
}

module.exports = { getCinemas, getSpesificCinema, addCinemas, updateCinema, deleteCinema }
