const errors = require('./src/errors')
const cleanStackTrace = require('./src/clean-stack-trace')
const { auth, errorHandler } = require('./src/koa')

module.exports = {
  errors,
  cleanStackTrace,
  koa: { auth, errorHandler }
}
