class AuthenticationError extends Error {
  constructor () {
    super('Authentication required')
    this.name = 'AuthenticationError'
  }
}

class AuthorizationError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'AuthorizationError'
  }
}

class ValidationError extends Error {
  constructor (message, errors) {
    super(message)
    this.name = 'ValidationError'
    this.errors = errors
  }
}

class NotFoundError extends Error {
  constructor (item) {
    super(`${item.charAt(0).toUpperCase() + item.slice(1)} not found`)
    this.name = 'NotFoundError'
  }
}

module.exports = {
  AuthenticationError,
  AuthorizationError,
  ValidationError,
  NotFoundError
}
