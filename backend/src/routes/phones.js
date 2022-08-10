const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')

const {
    getBrantList,
    getMaxprice,
    getMinprice,
    getLeastList,
    getHotList,
    getSearchList,
    getIteminfo,
    getCheckoutTransaction,
    FindUserSellPhone,
    getUpdateDisableState,
    createNewPhone,
    deletePhone
} = require('../controller/phone')

router.prefix('/api/phone')

//get all brand
router.get('/brandlist', async function(ctx, next) {
    const brandList = await getBrantList()
    ctx.body = new SuccessModel(brandList)
})

//max price
router.get('/maxprice', async function(ctx, next) {
    const maxprice = await getMaxprice()
    ctx.body = new SuccessModel(maxprice)
})

//min price
router.get('/minprice', async function(ctx, next) {
    const minprice = await getMinprice()
    ctx.body = new SuccessModel(minprice)
})

//least list Phone
router.get('/least-list', async function(ctx, next) {
    const leastList = await getLeastList()
    ctx.body = new SuccessModel(leastList)
})

//hot list Phone
router.get('/hot-list', async function(ctx, next) {
    const hotList = await getHotList()
    ctx.body = new SuccessModel(hotList)
})


//search state
router.get('/search-list', async function(ctx, next) {
    const query = ctx.query
    const searchList = await getSearchList(query)
    ctx.body = new SuccessModel(searchList)
})



//item state
router.get('/iteminfo', async function(ctx, next) {
    const query = ctx.query
    const iteminfo = await getIteminfo(query)
    ctx.body = new SuccessModel(iteminfo)
})


//item add check login
router.get('/itemstate', loginCheck, async function(ctx, next) {

    ctx.body = new SuccessModel("you are logined")
})


//item in checkout list
/* router.post('/checkoutlist', loginCheck, async function(ctx, next) {
    const arrCart = ctx.request.body
    let arrResult = []
    for (item of arrCart) {
        const _id = item._id
        const number = item.itemnumber
        const checkoutItem = await getCheckoutItemInformation(_id)
        const checkoutItemObj = {phoneItem: checkoutItem, number: number}
        arrResult.push(checkoutItemObj)
        ctx.body = new SuccessModel(arrResult)
    }
}) */

//checkout transaction
router.post('/checkoutitem', loginCheck, async function(ctx, next) {
    const arrCart = ctx.request.body
    let arrResult = []
    for (item of arrCart) {
        const _id = item._id
        const number = item.itemnumber
        const checkoutTransaction = await getCheckoutTransaction(_id, number)
        //const checkoutItemObj = {phoneItem: checkoutItem, number: number}
        arrResult.push(checkoutTransaction)
        ctx.body = new SuccessModel(arrResult)
    }
})
////Manage List
//seller List
router.get('/selllist', loginCheck, async function(ctx, next) {
    // add loginChenck, ensure login
    const userInfo = ctx.session.userInfo
    const email = userInfo.email
    console.log(email)
    const userSellList = await FindUserSellPhone(email)
    console.log(userSellList)
    ctx.body = new SuccessModel(userSellList)
  })

// change disable state
router.patch('/disablestate', loginCheck, async function (ctx, next) {
  
    const data = ctx.request.body
    const _id = data._id
    const disabled = data.disabled
  
    const disableState = await getUpdateDisableState(_id, disabled)
    ctx.body = new SuccessModel(disableState)
  })


//Create phone
router.post('/addnew', loginCheck, async function(ctx, next){
    const userInfo = ctx.session.userInfo
    const email = userInfo.email
    const phoneInfo = ctx.request.body
    console.log(phoneInfo)
    const newPhone = await createNewPhone(email, phoneInfo)
    ctx.body = new SuccessModel(newPhone)
})


// delete phone
router.post('/deletephone', loginCheck, async function (ctx, next) {
  
    const data = ctx.request.body
    const _id = data._id
  
    await deletePhone(_id)
    ctx.body = new SuccessModel()
  })

module.exports = router