module.exports = ({ throwErr = false, log = () => {} } = {}) => {
  return async (ctx, next) => {
    ctx.state.error = (errorInstance, status, reason, { type, trace, message } = {}) => {
      ctx.status = status

      const body = { status, type, message, reason }
      if (process.env.NODE_ENV !== 'production' && trace) body.trace = trace.split('\n    ')
      ctx.body = body

      log({ status, type, message, reason })
      if (throwErr) ctx.throw(errorInstance)
    }

    try {
      await next()
    } catch (e) {
      if (e.status) ctx.state.error(e, e.status, e.message, { trace: e.stack })
      else if (e.name === 'ValidationError') {
        const extraInfo = { type: e.name, trace: e.stack }
        if (e.errors && e.message) extraInfo.message = e.message

        ctx.state.error(e, 400, e.errors || e.message, extraInfo)
      } else if (e.name === 'NotFoundError') ctx.state.error(e, 404, e.message, { type: e.name, trace: e.stack })
      else {
        ctx.state.error(e, 500, e.message, { type: 'ServerError', trace: e.stack }) // @todo double check secure information throwing
        console.error(e.message, e.stack)
      }
    }
  }
}
