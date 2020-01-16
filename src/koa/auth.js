const jwt = require('jsonwebtoken')

function identify (secret, expiration) {
  function verifyAccessToken (token) { return jwt.verify(token, secret, { expiresIn: expiration }) }

  return async (ctx, next) => {
    try {
      const token = getTokenFromHeader(ctx.request.header.authorization)
      ctx.state.user = verifyAccessToken(token)
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

function permit (permissions) {
  return async (ctx, next) => {
    const checkObject = (permissions, ctx) => {
      if (permissions.roles) {
        if (!Array.isArray(permissions.roles)) permissions.roles = Array.of(permissions.roles)
        if (!permissions.roles.includes(ctx.state.user.role)) return false
      }
      if (permissions.context && !permissions.context(ctx)) return false
      return true
    }

    const isPermissionValid = (permission) => {
      if (Array.isArray(permission)) return permission.some(isPermissionValid)

      if (typeof permission === 'string' && permission !== ctx.state.user.role) return false
      if (typeof permission === 'object' && !checkObject(permission, ctx)) return false

      return true
    }

    if (!isPermissionValid(permissions)) ctx.throw(403, 'Access Denied')
    await next()
  }
}

module.exports = {
  getTokenFromHeader,
  authenticate,
  identify,
  permit
}

function getTokenFromHeader (header) {
  return header.replace('Bearer', '').trim()
}
