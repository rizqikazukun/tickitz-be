/* eslint-disable camelcase */
const Joi = require('joi')

const MovieModel = require('../models/movies')
const getMovies = async (req, res) => {
  try {
    const schema = Joi.object({
      search: Joi.string().allow('').optional(),
      year: Joi.string().allow('').optional(),
    })

    await schema.validateAsync(req.query)
    const movies = await MovieModel._getListMovies(req)

    if (movies.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
        data: movies,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: movies,
    })
  } catch (error) {
    console.log(error)
    res.status(502).json({
      success: false,
      message: 'Bad Gateway',
      data: [],
    })
  }
}

const getDetailMovie = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    })

    await schema.validateAsync(req.params)

    const movies = await MovieModel._getDetailMovie(req)

    if (movies.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
        data: movies,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: movies,
    })
  } catch (error) {
    console.log(error)
    res.status(502).json({
      success: false,
      message: 'Bad Gateway',
      data: [],
    })
  }
}

const addMovie = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(1).max(150).required(),
      release_date: Joi.date().required(),
      duration: Joi.string().allow(''),
      genres: Joi.array().items(Joi.string().min(5).max(20).allow('')),
      directed_by: Joi.string().allow(''),
      casts: Joi.array().items(Joi.string().min(5).max(30).allow('')),
      synopsis: Joi.string().allow(''),
      poster: Joi.string().uri().allow(''),
    })

    await schema.validateAsync(req.body)

    const movies = await MovieModel._addMovie(req)

    res.status(200).json({
      success: true,
      message: 'Data inserted',
      data: movies,
    })
  } catch (error) {
    console.log(error)
    res.status(502).json({
      success: false,
      message: 'Bad Gateway',
      data: [],
    })
  }
}

const updateMovie = async (req, res) => {
  try {
    const paramSchema = Joi.object({
      id: Joi.string().required(),
    })
    const bodySchema = Joi.object({
      name: Joi.string().min(1).max(150).required(),
      release_date: Joi.date().required(),
      duration: Joi.string().allow(''),
      genres: Joi.array().items(Joi.string().min(5).max(20).allow('')),
      directed_by: Joi.string().allow(''),
      casts: Joi.array().items(Joi.string().min(5).max(30).allow('')),
      synopsis: Joi.string().allow(''),
      poster: Joi.string().uri().allow(''),
    })

    await paramSchema.validateAsync(req.params)
    await bodySchema.validateAsync(req.body)

    const movies = await MovieModel._updateMovie(req)

    if (movies.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Data Updated',
      data: movies,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal Application Error',
      data: [],
    })
    return
    // don't remove return or it will buggy
  }
}

const deleteMovie = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    })
    await schema.validateAsync(req.params)

    const movies = await MovieModel._deleteMovie(req)

    if (movies.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Data Deleted',
      data: movies,
    })
  } catch (error) {
    console.log(error.message)
    const result = {
      success: false,
      message: 'Internal Application Error',
      data: [],
    }
    return res.status(500).json(result)
    // don't remove return or it will buggy
  }
}

module.exports = {
  getMovies,
  getDetailMovie,
  addMovie,
  updateMovie,
  deleteMovie,
}
