const errors = require('./src/errors')
const cleanStackTrace = require('./src/clean-stack-trace')
const errorHandler = require('./src/koa/error-handler')

module.exports = {
  errors,
  cleanStackTrace,
  koa: {
    errorHandler
  }
}
