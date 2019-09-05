const jwt = require('jsonwebtoken')

function identify (secret, expiration) {
  function verifyAccessToken (token) { return jwt.verify(token, secret, { expiresIn: expiration }) }

  return async (ctx, next) => {
    try {
      const token = getTokenFromHeader(ctx.request.header.authorization)
      const { login } = verifyAccessToken(token)
      ctx.state.user = { login }
    } catch (err) {
      ctx.state.user = null
    }
    await next()
  }
}

function authenticate () {
  return async (ctx, next) => {
    if (!ctx.state.user) ctx.throw(401, 'Authentication Error')
    await next()
  }
}

module.exports = {
  getTokenFromHeader,
  authenticate,
  identify
}

function getTokenFromHeader (header) {
  return header.replace('Bearer', '').trim()
}
