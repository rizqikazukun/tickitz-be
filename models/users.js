/* eslint-disable camelcase */
const sql = require('../utils/postgreConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserModels {
  static async _userRegister(payload) {
    const { first_name, last_name, email, password } = payload.body

    const role = 'user'
    const saltRoundssalt = 15
    const hashed = await bcrypt.hash(password, saltRoundssalt)
    const users = sql`
        INSERT INTO tbl_users_rzq (first_name, last_name, email, role, password) 
        VALUES (${first_name}, ${last_name}, ${email}, ${role}, ${hashed}) returning uid`
    return users
  }

  static async _userLogin(payload) {
    const { email } = payload.body
    const users = await sql`SELECT * FROM tbl_users_rzq where email=${email}`
    return users
  }

  static async _getListUser() {
    const users =
      await sql`SELECT first_name, last_name, photo_profile, uid FROM tbl_users_rzq`
    return users
  }

  static async _getDetailUser(payload) {
    const token = payload.headers.authorization.split('Bearer ')[1]
    const { uid } = jwt.decode(token, process.env.JWT_SECRET)
    const users =
      await sql`SELECT first_name, last_name, phone_number, email, role, photo_profile, uid FROM tbl_users_rzq where uid=${uid}`
    return users
  }

  static async _updateUser(payload) {
    const token = payload.headers.authorization.split('Bearer ')[1]
    const { uid } = jwt.decode(token, process.env.JWT_SECRET)
    const { first_name, last_name, phone_number, photo_profile } = payload.body

    const users = await sql`update tbl_users_rzq set
          first_name=${first_name},
          last_name=${last_name},
          phone_number=${phone_number},
          photo_profile=${photo_profile}
          where uid=${uid} RETURNING uid;`

    return users
  }

  static async _updateUserEmail(payload) {
    const token = payload.headers.authorization.split('Bearer ')[1]
    const { uid } = jwt.decode(token, process.env.JWT_SECRET)
    const { email } = payload.body

    const users = await sql`
          update tbl_users_rzq set
          email=${email}
          where uid=${uid} RETURNING uid;`
    return users
  }

  static async _updateUserPassword(payload) {
    const token = payload.headers.authorization.split('Bearer ')[1]
    const { uid } = jwt.decode(token, process.env.JWT_SECRET)
    const { password } = payload.body
    const saltRoundssalt = 15

    const hashed = await bcrypt.hash(password, saltRoundssalt)

    const users = await sql`
          update tbl_users_rzq set
          password=${hashed}
          where uid=${uid} RETURNING uid;`

    return users
  }
}

module.exports = UserModels
