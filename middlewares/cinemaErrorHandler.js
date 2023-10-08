const cinemaErrorHandler = (err, req, res, next) => {
  let status = 500
  let success = false
  let message = 'internal application error'

  console.log(err)
  if (err.message.includes('Not Found')) {
    status = 404
    message = err.message.replaceAll('"', "'")
  }
  if (err.message.includes('violates foreign key constraint')) {
    status = 422
    message = 'Make sure you have selected movie'
  }
  if (
    err.message.includes('is required') ||
    err.message.includes('is not allowed to be empty') ||
    err.message.includes('length must be') ||
    err.message.includes('must be a valid date') ||
    err.message.includes('must be a valid uri') ||
    err.message.includes('must be a string') ||
    err.message.includes('must be a safe number') ||
    err.message.includes('must be a number') ||
    err.message.includes('must be less than or equal to') ||
    err.message.includes('invalid input syntax for type')
  ) {
    // this is for error throw by Joi and developer known releated error
    status = 422
    message = err.message.replaceAll('"', "'")
  }

  res.status(status).json({ success, message })
}

module.exports = cinemaErrorHandler
