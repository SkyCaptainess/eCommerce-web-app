const { Cart } = require('../models/index')
const { User } = require('../models/index')
const { Phone} = require('../models/index')
async function addToCart(email, phoneAdd = {}) {
    const _id = await User.find({
        email: email
    }, { _id: 1 })
    const itemid = phoneAdd._id
    const item = await Phone.findOne({
        _id: itemid
    })
    const stock = item.stock
    const addnumber = phoneAdd.itemnumber
    if (stock >= addnumber) {
        const newCart = await Cart.create({
            userId: _id[0]._id,
            phoneDetail: {
                phondId: phoneAdd._id,
                num: phoneAdd.itemnumber
            }
        })
        console.log(newCart)
        return newCart
    } else {
        const err = "Not encough product"
        return err
    } 
    
}


async function getPhoneInformation(_id) {
    const checkoutItem = await Phone.findOne({ 
        _id: _id
    })

    const brand = checkoutItem.brand
    checkoutItem.image = `http://localhost:3000/images/${brand}.jpeg`

    return checkoutItem
}

async function getCheckoutItemInformation(email) {
    const _id = await User.find({ 
        email: email
    },{_id:1})
    const cartPhonesList = await Cart.find({ 
        userId: _id[0]._id,
    })

    let result = []
    for (const item of cartPhonesList) {
        let data
        const cartPhoneId = item.phoneDetail.phondId
        const phoneNumber = item.phoneDetail.num
        const phoneState = item.phoneDetail.phondSate
        const checkoutItem = await getPhoneInformation(cartPhoneId)
        data = {...{checkoutItem}, ...{phoneNumber}, ...{phoneState}}
        result.push(data)
        
    }

    //console.log("...................."+result[0])
    return result 
    
}

async function editNumber(email, phoneNum = {}) {
    const _id = await User.find({
        email: email
    }, { _id: 1 })
    const itemid = phoneNum._id
    const item = await Phone.findOne({
        _id: itemid
    })
    const stock = item.stock
    const addnumber = phoneNum.itemnumber
    if (stock >= addnumber) {
        const phoneNum = await Cart.findOneAndUpdate(
            { userId: _id[0]._id, "phoneDetail.phondId": itemid, },
            { "phoneDetail.num": addnumber },
            {
                new: true
            })
        return phoneNum
    } else {
        const err = "Not encough product"
        return err
    }

}


async function editState(email, Phonestate = {}) {
    const _id = await User.find({
        email: email
    }, { _id: 1 })
    const itemid = Phonestate._id
    const itemstate = Phonestate.checkstate

    const newPhoneState = await Cart.findOneAndUpdate(
        { userId: _id[0]._id, "phoneDetail.phondId": itemid, },
        { "phoneDetail.phondSate": itemstate },
        {
            new: true
        })
    return newPhoneState


}

async function deleteItem(email, itemId) {
    const _id = await User.find({
        email: email
    }, { _id: 1 })

    const itemdelete = await Cart.deleteOne(
        { userId: _id[0]._id, "phoneDetail.phondId": itemId, }
        )
    return itemdelete


}



async function getCheckoutTransaction(email,phoneId, phoneNumber) {
    
    const itemid = phoneId
    const item = await Phone.findOne({
        _id: itemid
    })
    const stock = item.stock
    const addnumber = phoneNumber

    if (stock >= addnumber) {
        const _id = await User.find({
            email: email
        }, { _id: 1 })
    
    
        const checkoutTransactionPhone = await Phone.findByIdAndUpdate(
            { _id: phoneId },
            { $inc: { stock: -phoneNumber } })
    
        const checkoutTransactionCart = await Cart.findOneAndUpdate(
            { userId: _id[0]._id, "phoneDetail.phondId": phoneId, },
            { "phoneDetail.num": phoneNumber },
            {
                new: true
            })
            const itemdelete = await Cart.deleteOne(
                { userId: _id[0]._id, "phoneDetail.phondId": phoneId, }
            )
            const checkoutTransaction = { ...{ checkoutTransactionPhone }, ...{ checkoutTransactionCart }, ...{itemdelete} }
    
    
            return checkoutTransaction
        } else {
            const err = "Not encough product"
            return err
        }
    }


module.exports = { 
    addToCart,
    getCheckoutItemInformation,
    editNumber,
    editState,
    deleteItem,
    getCheckoutTransaction
}