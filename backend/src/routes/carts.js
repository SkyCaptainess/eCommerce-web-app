const router = require('koa-router')()

const { addToCart, getCheckoutItemInformation, editNumber, editState, deleteItem, getCheckoutTransaction } = require('../controller/cart')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/cart')

//add item to cart
router.post('/addtocheckoutlist', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const email = userInfo.email
    const phoneAdd = ctx.request.body
    console.log(phoneAdd)
    try {
        const newCart = await addToCart(email, phoneAdd)
        ctx.body = new SuccessModel(newCart)
    } catch (error) {
        ctx.body = new ErrorModel(10008, `You have already added this item`)
    }

})


//item in checkout list
router.get('/checkoutlist', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const email = userInfo.email
    const cartPhonesList = await getCheckoutItemInformation(email)
    ctx.body = new SuccessModel(cartPhonesList)
})


//checkout edit number
router.post('/checkoutitemsnumber', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const email = userInfo.email
    const phoneNum = ctx.request.body
    console.log(phoneNum)

    const newPhoneNumber = await editNumber(email, phoneNum)
    ctx.body = new SuccessModel(newPhoneNumber)


})

//checkout edit item state
router.post('/checkoutitemsstate', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const email = userInfo.email
    const Phonestate = ctx.request.body
    console.log(Phonestate)

    const newPhoneState = await editState(email, Phonestate)
    ctx.body = new SuccessModel(newPhoneState)


})

//checkout delete item
router.post('/checkoutitemsdelete', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const email = userInfo.email
    const itemIdO = ctx.request.body
    const itemId = itemIdO._id

    console.log(itemId)

    const itemdelete = await deleteItem(email, itemId)
    ctx.body = new SuccessModel(itemdelete)
})

//checkout transaction
router.post('/checkoutitems', loginCheck, async function (ctx, next) {
    const userInfo = ctx.session.userInfo
    const email = userInfo.email
    const arrCart = ctx.request.body

    if (arrCart instanceof Array) {
        let arrResult = []
        for (item of arrCart) {
            const phoneId = item._id
            const phoneNumber = item.itemnumber
            const checkoutTransaction = await getCheckoutTransaction(email, phoneId, phoneNumber)
            arrResult.push(checkoutTransaction)
            ctx.body = new SuccessModel(arrResult)
        }
    }else{
        ctx.body = new ErrorModel(10001, `You have no item in cart`)
    }
})


module.exports = router