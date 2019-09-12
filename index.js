const errors = require('./src/errors')
const cleanStackTrace = require('./src/clean-stack-trace')
const getTokenFromHeader = require('./src/get-token-from-header')
const { auth, errorHandler } = require('./src/koa')

module.exports = {
  errors,
  cleanStackTrace,
  getTokenFromHeader,
  koa: { auth, errorHandler }
}
