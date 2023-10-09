const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1]
    const auth = jwt.verify(token, process.env.JWT_SECRET)
    const { role } = jwt.decode(token, process.env.JWT_SECRET)

    if (auth && role === 'admin') {
      next()
    } else {
      throw { message: 'Unauthorize' }
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = adminAuth
