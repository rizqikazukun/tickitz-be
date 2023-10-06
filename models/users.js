/* eslint-disable camelcase */
const sql = require('../utils/postgreConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserModels {
  static async _userRegister(payload) {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      photo_profile,
    } = payload.body

    const saltRoundssalt = 15
    const hashed = await bcrypt.hash(password, saltRoundssalt)
    const users = sql`
        INSERT INTO users (first_name, last_name, phone_number, email, password, photo_profile) 
        VALUES (${first_name}, ${last_name}, ${phone_number}, ${email}, ${hashed}, ${photo_profile}) returning id`

    return users
  }

  static async _userLogin(payload) {
    const { email } = payload.body
    const users = await sql`SELECT * FROM users where email=${email}`
    return users
  }

  static async _getListUser() {
    const users = await sql`SELECT * FROM Users`
    return users
  }

  static async _getDetailUser(payload) {
    const token = payload.headers.authorization.split('Bearer ')[1]
    const { id } = jwt.decode(token, process.env.JWT_SECRET)
    const users =
      await sql`SELECT first_name, last_name, phone_number, email, photo_profile FROM users where id=${id}`
    return users
  }

  static async _updateUser(payload) {
    const token = payload.headers.authorization.split('Bearer ')[1]
    const { id } = jwt.decode(token, process.env.JWT_SECRET)
    const { first_name, last_name, phone_number, email } = payload.body

    const users = await sql`
          update users set
          first_name=${first_name},
          last_name=${last_name},
          phone_number=${phone_number},
          email=${email}
          where id=${id} RETURNING id;`

    return users
  }

  static async _updateUserPassword(payload) {
    const token = payload.headers.authorization.split('Bearer ')[1]
    const { id } = jwt.decode(token, process.env.JWT_SECRET)
    const { password } = payload.body
    const saltRoundssalt = 15

    const hashed = await bcrypt.hash(password, saltRoundssalt)

    const users = await sql`
          update users set
          password=${hashed}
          where id=${id} RETURNING id;`

    return users
  }
}

module.exports = UserModels
