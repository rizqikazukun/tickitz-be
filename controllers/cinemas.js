const CinemasModel = require('../models/cinemas')
const Joi = require('joi')

const getCinemas = async (req, res) => {
  try {
    const cinemas = await CinemasModel._getListCinemas()

    if (cinemas.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: cinemas,
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

const getSpesificCinema = async (req, res) => {
  try {
    const { id } = req.params

    const schema = Joi.object({
      id: Joi.string().required(),
    })

    await schema.validateAsync(req.params)

    const cinemas = await CinemasModel._getSelectedCinema(id)

    if (cinemas.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
        data: cinemas,
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'OK',
      data: cinemas,
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

const addCinemas = async (req, res) => {
  try {
    const schema = Joi.object({
      movie_id: Joi.number().required(),
      name: Joi.string().min(1).max(100).required(),
      city: Joi.string().min(1).max(50).allow(''),
      address: Joi.string().min(1).max(150).allow(''),
      show_times: Joi.array().items(Joi.string().min(5).max(5).required()),
      price: Joi.number().min(10000).max(10000000).required(),
      logo: Joi.string().uri().allow(''),
    })

    await schema.validateAsync(req.body)

    const cinemas = await CinemasModel._addCinema(req)

    res.status(200).json({
      success: true,
      message: 'Data inserted',
      data: cinemas,
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

const updateCinema = async (req, res) => {
  try {
    const paramSchema = Joi.object({
      id: Joi.string().required(),
    })

    const bodySchema = Joi.object({
      movie_id: Joi.number().required(),
      name: Joi.string().min(1).max(100).required(),
      city: Joi.string().min(1).max(50).allow(''),
      address: Joi.string().min(1).max(150).allow(''),
      show_times: Joi.array().items(Joi.string().min(5).max(5).required()),
      price: Joi.number().min(10000).max(10000000).required(),
      logo: Joi.string().uri().allow(''),
    })

    await paramSchema.validateAsync(req.params)
    await bodySchema.validateAsync(req.body)

    const movies = await CinemasModel._udateCinema(req)

    if (movies.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Not Found',
      })
      return
    }

    const result = {
      success: true,
      message: 'Data Updated',
      data: movies,
    }
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    const result = {
      success: false,
      message: 'Internal Application Error',
      data: [],
    }
    return res.status(500).json(result)
    // don't remove return or it will buggy
  }
}

const deleteCinema = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    })

    await schema.validateAsync(req.params)

    const cinemas = await CinemasModel._deleteCinema(req)

    if (cinemas.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Delete Failed, Not Found',
      })
      return
    }

    const result = {
      success: true,
      message: 'Data Deleted',
      data: cinemas,
    }
    console.log(result)
    res.status(200).json(result)
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
  getCinemas,
  getSpesificCinema,
  addCinemas,
  updateCinema,
  deleteCinema,
}
