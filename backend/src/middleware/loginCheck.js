/**
 * login Check middleware
 */

 const { ErrorModel } = require('../res-model/index')

 module.exports = async (ctx, next) => {
     //const session = ctx.session
     if (ctx.session && ctx.session.userInfo) {
         await next()
         return
     }
 
     // ctx.body = {
     //     errno: -1,
     //     message: 'You haven't been not login'
     // }
 
     ctx.body = new ErrorModel(10003, "You haven't been not login")
 }
 

 