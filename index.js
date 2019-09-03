const errors = require('./errors')
const cleanStackTrace = require('./clean-stack-trace')
const errorHandler = require('./koa/error-handler')

module.exports = {
  errors,
  cleanStackTrace,
  koa: {
    errorHandler
  }
}
