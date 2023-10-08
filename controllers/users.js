/* eslint-disable camelcase */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModels = require('../models/users')
const Joi = require('joi')

class UsersController {
  static async userRegister(req, res, next) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().min(1).max(20).required(),
        last_name: Joi.string().min(1).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required()
      })

      // Joi will automatically throw error to catch
      await schema.validateAsync(req.body)

      // Postgress will automatically throw error to catch
      const user = await UserModels._userRegister(req)

      res.status(201).json({
        success: true,
        message: 'created',
        data: user
      })
    } catch (error) {
      next(error)
    }
  }

  static async loginUser(req, res, next) {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })

      await schema.validateAsync(req.body)

      const { password } = req.body
      const userData = await UserModels._userLogin(req)

      if (userData.length === 0) {
        throw { type: 'user', message: 'Email Not Registered' }
      }

      const match = await bcrypt.compare(password, userData[0].password)

      if (!match) {
        throw { type: 'user', message: 'Password Incorrect' }
      }

      const accessToken = await jwt.sign(
        {
          uid: userData[0].uid,
          role: userData[0].role,
          email: userData[0].email
        },
        process.env.JWT_SECRET
      )

      res.status(200).json({
        success: true,
        message: 'login success',
        accessToken
      })
    } catch (error) {
      next(error)
    }
  }

  static async getListUser(req, res, next) {
    try {
      const userData = await UserModels._getListUser()

      if (userData.length === 0) {
        throw {
          type: 'db_user',
          message: 'No user found',
          reason: ''
        }
      }

      res.status(200).json({
        success: true,
        message: 'OK',
        data: userData
      })
    } catch (error) {
      next(error)
    }
  }

  static async getDetailUser(req, res, next) {
    try {
      const userData = await UserModels._getDetailUser(req)

      if (userData.length === 0) {
        throw {
          type: 'db_user',
          message: 'No user found',
          reason: 'User has been deleted'
        }
      }

      res.status(200).json({
        success: true,
        message: 'OK',
        data: userData
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateUser(req, res, next) {
    try {
      const schema = Joi.object({
        first_name: Joi.string().min(1).max(20).required(),
        last_name: Joi.string().min(1).max(20).required(),
        phone_number: Joi.string().min(1).max(15).allow(''),
        photo_profile: Joi.string().uri().allow('')
      })

      await schema.validateAsync(req.body)

      const userData = await UserModels._updateUser(req)

      if (userData.length === 0) {
        throw {
          type: 'db_user',
          message: 'No user found',
          reason: 'User has been deleted'
        }
      }

      res.status(200).json({
        success: true,
        message: 'Data Updated',
        data: userData
      })
    } catch (error) {
      next(error)
    }
  }

  static async _updateUserEmail(req, res, next) {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required()
      })

      await schema.validateAsync(req.body)

      const userData = await UserModels._updateUserEmail(req)

      if (userData.length === 0) {
        throw {
          type: 'db_user',
          message: 'No user found',
          reason: 'User has been deleted'
        }
      }

      res.status(200).json({
        success: true,
        message: 'Email Updated',
        data: userData
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateUserPassword(req, res, next) {
    try {
      const schema = Joi.object({
        password: Joi.string().required()
      })

      await schema.validateAsync(req.body)

      const userData = await UserModels._updateUserPassword(req)

      if (userData.length === 0) {
        throw {
          type: 'db_user',
          message: 'No user found',
          reason: 'User has been deleted'
        }
      }

      res.status(200).json({
        success: true,
        message: 'Password Updated',
        data: userData
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UsersController
