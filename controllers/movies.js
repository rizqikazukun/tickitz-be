/* eslint-disable camelcase */
const MovieModel = require('../models/movies')
const sql = require('../utils')

const getMovies = async (req, res) => {
  try {

    const movies = await MovieModel._getListMovies(req)

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

    const movies = await MovieModel._getDetailMovie(req)

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

    const movies = await MovieModel._addMovie(req)

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

const updateMovie = async (req, res) => {
  try {

    const movies = await MovieModel._updateMovie(req)

    const result = {
      success: true,
      message: 'Data Updated',
      data: movies
    }
    res.status(200).json(result)
  } catch (error) {

    console.log(error.message)
     res.status(500).json({
      success: false,
      message: 'Internal Application Error',
      data: []
    })
    return
    // don't remove return or it will buggy
  }
}

const deleteMovie = async (req, res) => {
  try {
    const movies = await MovieModel._deleteMovie(req)

    const result = {
      success: true,
      message: 'Data Deleted',
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

module.exports = { getMovies, getDetailMovie, addMovie, updateMovie, deleteMovie }
