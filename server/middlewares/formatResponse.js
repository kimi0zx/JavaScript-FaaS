const { STATUS_CODE } = require('./constants')

const formatResponse = async (ctx, next) => {
  try {
    await next()
    console.log(ctx.body)
    ctx.body = {
      status: STATUS_CODE.OK,
      message: 'successful',
      data: ctx.body
    }
  } catch (e) {
    console.log("ERR")
    ctx.body = {
      status: STATUS_CODE.ERROR,
      message: e.toString(),
      data: {}
    }
  }
}

module.exports = {
  formatResponse
}
