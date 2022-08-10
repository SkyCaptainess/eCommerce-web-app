const router = require('koa-router')()

const { register, login, FindUserByEmail, updateUserProfile, CheckUserPassword, updateUserPassword } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const md5 =require('md5');
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/user')

//Create account
router.post('/register', async function(ctx, next){
    const userInfo = ctx.request.body
    //const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(userInfo)
    console.log(reg.test(userInfo.email))
    try {
        await register(userInfo)
        // success
        
        if (reg.test(userInfo.email)) {
          ctx.body = new SuccessModel()
        }else{
          ctx.body = "Not a email"
        }
      } catch (ex) {
        console.error(ex)
        // fail
        ctx.body = new ErrorModel(10001, `Can't create - ${ex.message}`)
      }
})

//login
router.post('/login', async function(ctx, next) {
  const { email, password } = ctx.request.body

  const mdpassword = md5(password)

  const res = await login(email, mdpassword)
  if (res) {
    // login success need set session.userInfo
    ctx.session.userInfo = {
      email
    }
    // console.log(email)
    // console.log(mdpassword)
    // console.log(ctx.session.userInfo)

    // response Body
    ctx.body = new SuccessModel()
  } else {
    // response Body
    ctx.body = new ErrorModel(10002, `InCorrect email or password`)
  }
})

//logout
router.post('/out', async function(ctx, next) {
  ctx.session.userInfo = undefined
  ctx.body = new SuccessModel()
})

//display profile
router.get('/info', loginCheck, async function(ctx, next) {
  // add loginChenck, ensure login
  const userInfo = ctx.session.userInfo
  const email = userInfo.email
  //const email = ctx.query.email
  console.log(email)
  const userProfile = await FindUserByEmail(email)
  
  ctx.body = new SuccessModel(userProfile)
})

// Update profile
router.patch('/modify', loginCheck, async function (ctx, next) {
  const userInfo = ctx.session.userInfo
  const email = userInfo.email

  const data = ctx.request.body || {}

  const newUserProfile = await updateUserProfile(email, data)
  ctx.body = new SuccessModel(newUserProfile)
})


//check password before modify profile
router.post('/checkpassword', async function(ctx, next) {
  const { password } = ctx.request.body
  const userInfo = ctx.session.userInfo
  const email = userInfo.email
  const password1 = md5(password) 
  console.log(password1)
  
  const checkPassword = await CheckUserPassword(email, password1)
  if (checkPassword) {
    ctx.body = new SuccessModel(checkPassword)
  }else{
    // fail
    ctx.body = new ErrorModel(10005, `InCorrect password`)
  }

  
})

//Updata password
router.patch('/modifypassword', loginCheck, async function (ctx, next){
  const userInfo = ctx.session.userInfo
  const email = userInfo.email
  const { oldPasswordold, newPassword } = ctx.request.body

  const mdoldPasswordold = md5(oldPasswordold)
  const mdnewPassword = md5(newPassword)
  //const data = ctx.request.body || {}

  
  const newUserPassword = await updateUserPassword(email, mdoldPasswordold, mdnewPassword)
  
  if (newUserPassword) {
    ctx.body = new SuccessModel(newUserPassword)
  }else{
    // fail
    ctx.body = new ErrorModel(10004, `InCorrect password`)
  }

  
})



module.exports = router