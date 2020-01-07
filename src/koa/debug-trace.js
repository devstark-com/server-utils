const config = require('config').get('server')
const shortId = require('shortid')

module.exports = function (app) {
  if (config.env !== 'development') return async (ctx, next) => { await next() }
  require('koa-trace')(app)
  app.debug()

  return async (ctx, next) => {
    ctx.id = shortId.generate()

    ctx.trace('start')
    ctx.trace(`request info:\n\tmethod: ${ctx.request.method}\n\tpath: ${ctx.request.path}`)
    await next()
    ctx.trace('finish')
  }
}
