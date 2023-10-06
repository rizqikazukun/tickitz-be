const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('Bearer ')[1]
    const auth = await jwt.verify(token, process.env.JWT_SECRET)

    if (auth) {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      message: 'Unauthorize',
    })
  }
}

module.exports = auth
