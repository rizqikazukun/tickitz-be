
const CinemasModel = require('../models/cinemas')

const getCinemas = async (req, res) => {
  try {
    const cinemas = await CinemasModel._getListCinemas

    if (cinemas.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found'
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

    const cinemas = await CinemasModel._getSelectedCinema(id)

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

    const cinemas = await CinemasModel._addCinema(req)

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

    const movies = await CinemasModel._udateCinema(req)

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

    const cinemas = await CinemasModel._deleteCinema(req)
    console.log("🚀 ~ file: cinemas.js:119 ~ deleteCinema ~ cinemas:", cinemas)

    if (cinemas.length === 0 ){
      res.status(404).json({
        success: false,
        message: 'Delete Failed, Not Found'
      })
      return
    }

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
