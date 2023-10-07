/* eslint-disable camelcase */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModels = require('../models/users')
const Joi = require('joi')

class UsersController {
  static async userRegister(req, res) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().min(1).max(20).required(),
        last_name: Joi.string().min(1).max(20).required(),
        phone_number: Joi.string().min(1).max(15).allow(''),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required(),
        photo_profile: Joi.string().uri().allow(''),
      })

      await schema.validateAsync(req.body)

      const user = await UserModels._userRegister(req)

      res.status(201).json({
        success: true,
        message: 'created',
        data: user,
      })
    } catch (error) {
      console.log(error)
      if (
        error.message ===
        'duplicate key value violates unique constraint "unique_email"'
      ) {
        res.status(400).json({
          success: false,
          message: 'Bad Input',
        })
        return
      }
      res.status(502).json({
        success: false,
        message: 'Bad Gateway',
      })
    }
  }

  static async loginUser(req, res) {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      })

      await schema.validateAsync(req.body)

      const { password } = req.body
      const userData = await UserModels._userLogin(req)

      if (userData.length === 0) {
        throw { message: 'Email Not Registered' }
      }

      const match = await bcrypt.compare(password, userData[0].password)

      if (!match) {
        throw { message: 'Password Incorrect' }
      }

      const accessToken = await jwt.sign(
        {
          id: userData[0].id,
          email: userData[0].email,
        },
        process.env.JWT_SECRET,
      )

      res.status(200).json({
        success: true,
        message: 'login success',
        accessToken,
      })
    } catch (error) {
      console.log(error)
      if (
        error.message === '"email" must be a valid email' ||
        error.message === '"password" must be a string'
      ) {
        res.status(422).json({
          success: false,
          message: error.message,
        })
        return
      }
      res.status(502).json({
        success: false,
        message: 'Internal Application Error',
      })
    }
  }

  static async getListUser(req, res) {
    try {
      const userData = await UserModels._getListUser()

      res.status(200).json({
        success: true,
        message: 'OK',
        data: userData,
      })
    } catch (error) {
      console.log(error)
      res.status(502).json({
        success: false,
        message: 'Internal Application Error',
      })
    }
  }

  static async getDetailUser(req, res) {
    try {
      const userData = await UserModels._getDetailUser(req)

      res.status(200).json({
        success: true,
        message: 'OK',
        data: userData,
      })
    } catch (error) {
      console.log(error)
      res.status(502).json({
        success: false,
        message: 'Internal Application Error',
      })
    }
  }

  static async updateUser(req, res) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().min(1).max(20).required(),
        last_name: Joi.string().min(1).max(20).required(),
        phone_number: Joi.string().min(1).max(15).allow(''),
        email: Joi.string().email().required(),
        photo_profile: Joi.string().uri().allow(''),
      })

      await schema.validateAsync(req.body)

      const users = await UserModels._updateUser(req)

      res.status(200).json({
        success: true,
        message: 'Data Updated',
        data: users,
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        success: false,
        message: 'Internal Application Error',
        data: [],
      })

      // don't remove return or it will buggy
    }
  }

  static async updateUserPassword(req, res) {
    try {
      const schema = Joi.object({
        password: Joi.string().required(),
      })

      await schema.validateAsync(req.body)

      const users = await UserModels._updateUserPassword(req)
      res.status(200).json({
        success: true,
        message: 'Password Updated',
        data: users,
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        success: false,
        message: 'Internal Application Error',
      })
      return
    }
  }
}

module.exports = UsersController
