const userErrorHandler = (err, req, res, next) => {
  let status = 500
  let success = false
  let message = 'internal application error'

  console.log(err)

  if (err.type === 'db_user' && err.message === 'No user found') {
    // this is for error throw by developer known releated error
    status = 404
    message = err.message
  }
  if (
    err.message ===
    'duplicate key value violates unique constraint "unique_email"'
  ) {
    // this is for error throw by postgres
    status = 422
    message = "Can't use same email, Email already used."
  }
  if (
    err.message === '"email" must be a valid email' ||
    err.message === '"password" must be a string' ||
    err.message === 'Email Not Registered' ||
    err.message === 'Password Incorrect'
  ) {
    // this is for error throw by Joi and developer known releated error
    status = 422
    message = err.message.replaceAll('"', "'")
  }

  res.status(status).json({ success, message })
}

module.exports = userErrorHandler
