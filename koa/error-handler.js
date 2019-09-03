module.exports = async (ctx, next) => {
  ctx.state.error = (status, reason, { type, trace, message } = {}) => {
    ctx.status = status

    const body = { status, type, message, reason }
    if (process.env.NODE_ENV !== 'production') body.trace = trace.split('\n    ')
    ctx.body = body
  }

  try {
    await next()
  } catch (e) {
    if (e.status) ctx.state.error(e.status, e.message, { trace: e.stack })
    else if (e.name === 'ValidationError') {
      const extraInfo = { type: e.name, trace: e.stack }
      if (e.errors && e.message) extraInfo.message = e.message

      ctx.state.error(400, e.errors || e.message, extraInfo)
    } else if (e.name === 'NotFound') ctx.state.error(404, e.message, { type: e.name, trace: e.stack })
    else {
      ctx.state.error(500, e.message, { type: 'ServerError', trace: e.stack }) // @todo double check secure information throwing
      console.error(e.message, e.stack)
    }
  }
}
