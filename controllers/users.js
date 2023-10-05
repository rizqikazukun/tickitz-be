const sql = require('../utils')
const bcrypt = require('bcrypt')

const saltRoundssalt = 15


class Users {

    static async addUser(req, res) {
        try {
            const { first_name, last_name, phone_number, email, password, photo_profile } = req.body

            const isValid = `${typeof first_name === typeof String() ||
                typeof last_name === typeof String() ||
                typeof phone_number === typeof String() ||
                typeof password === typeof String() ||
                typeof photo_profile === typeof String() ? true : false
                }`

            if (!isValid) {
                res.status(400).json({
                    success: false,
                    message: "Bad Input",
                })
                return
            }

            const hashed = await bcrypt.hash(password, saltRoundssalt)

            const user = await sql`
            INSERT INTO users (first_name, last_name, phone_number, email, password, photo_profile) 
            VALUES (${first_name}, ${last_name}, ${phone_number}, ${email}, ${hashed}, ${photo_profile}) returning id`

            res.status(201).json({
                success: true,
                message: "created",
                data: user
            })


        } catch (error) {
            console.log(error)
            if (error.message === 'duplicate key value violates unique constraint "unique_email"') {
                res.status(400).json({
                    success: false,
                    message: "Bad Input",
                })
                return
            }
            res.status(502).json({
                success: false,
                message: "Bad Gateway",
            })
            return
        }
    }

    static async getUsers(req, res) {
        
    }


}

module.exports = Users