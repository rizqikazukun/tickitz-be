const sql = require('../utils')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                    message: "Bad Input"
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

    static async loginUser(req, res) {
        try {

            const { email, password } = req.body

            const isValid = `${typeof email === typeof String() ||
                typeof password === typeof String() ? true : false}`

            if (!isValid) {
                res.status(400).json({
                    success: false,
                    message: "Bad Input",
                })
                return
            }

            const userData = await sql`SELECT * FROM users where email=${email}`

            const match = await bcrypt.compare(password, userData[0].password)

            if (!match) {
                res.status(401).json({
                    success: false,
                    message: 'login failed',
                    data: []
                })
                return
            }

            const accessToken = await jwt.sign({
                id: userData[0].id,
                email: userData[0].email
            }, process.env.JWT_SECRET)

            res.status(200).json({
                success: true,
                message: 'login success',
                accessToken
            })


        } catch (error) {

            console.log(error)
            res.status(502).json({
                success: false,
                message: 'Internal Application Error',
            })
        }
    }

    static async getListUser(req, res) {
        try {
            const userData = await sql`SELECT * FROM Users`

            console.log("🚀 ~ file: users.js:115 ~ Users ~ getListUser ~ userData:", userData)
            res.status(200).json({
                success: true,
                message: 'OK',
                data: userData
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

            const token = req.headers.authorization.split('Bearer ')[1]
            const { id } = jwt.decode(token, process.env.JWT_SECRET)

            const userData = await sql`SELECT first_name, last_name, phone_number, email, photo_profile FROM users where id=${id}`

            res.status(200).json({
                success: true,
                message: 'OK',
                data: userData
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
            const token = req.headers.authorization.split('Bearer ')[1]
            const { id } = jwt.decode(token, process.env.JWT_SECRET)
            const { first_name, last_name, phone_number, email } = req.body

            if (!id) {
                const result = {
                    success: false,
                    message: 'Bad Input, please insert proper id',
                    data: []
                }
                res.status(400).json(result)
            }

            const movies = await sql`
            update users set
            first_name=${first_name},
            last_name=${last_name},
            phone_number=${phone_number},
            email=${email}
            where id=${id} RETURNING id;`

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



}

module.exports = Users