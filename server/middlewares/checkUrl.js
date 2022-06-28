const checkUrl = async (ctx, next) => {
  ctx.url = ctx.url.replace('//', '/')
  await next()
}

module.exports = {
  checkUrl,
}
