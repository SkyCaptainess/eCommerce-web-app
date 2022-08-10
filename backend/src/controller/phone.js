const { Phone} = require('../models/index')
const { User } = require('../models/index')
//var urlencode = require('urlencode')

//brand list
async function getBrantList() {
    let brandList = await Phone.distinct('brand')

    return brandList
    
}

/* http://localhost:3000/images/Apple.jpeg */

//Max price
async function getMaxprice() {
    let maxprice = await Phone.aggregate([  
        {$match: {$nor: [    
            {disabled:"enabled"},
            {stock:{"$lt": 1}}
        ]}},
        {$group: {_id: "$_id", 
            maxprice: {$max: "$price"}
        }},
        {$sort: {maxprice: -1}},
        {$limit: 1}
        ])

    return maxprice
    
}


//Min price
async function getMinprice() {
    let minprice = await Phone.aggregate([  
        {$match: {$nor: [    
            {disabled:"enabled"},
            {stock:{"$lt": 1}}
        ]}},
        {$group: {_id: "$_id", 
            maxprice: {$max: "$price"}
        }},
        {$sort: {maxprice: 1}},
        {$limit: 1}
        ])

    return minprice
    
}



//Least list
async function getLeastList() {
    let list = await Phone.find({ 
        stock:{"$gte": 1},
        disabled: "disabled"
    }).sort({ stock: 1 }).limit(5)
    //console.log(list[0].brand)

    for (const item of list) {
        //const {image} = item
        const images = item.brand
        item.image = `http://localhost:3000/images/${images}.jpeg`
        /* http://localhost:3000/images/Apple.jpeg */
        //console.log("/////////////////////////")
        //console.log(item)
        console.log("item.image:"+ images)
        console.log("item.brand:"+item.brand)
    }

    console.log("/////////////////////////")

    return list
}













//Hot list
async function getHotList() {
    let list = await Phone.aggregate([  
        {$match: {$nor: [    
            {reviews: {$exists: false}},
            {reviews: {$size: 0}},
            {reviews: {$size: 1}},
            {disabled:"enabled"},
            {stock:{"$lt": 1}}
        ]}},
        {$unwind:"$reviews"},
        {$group: {_id: "$_id", 
            title:{$first:"$title"}, 
            brand:{$first:"$brand"}, 
            image: {$first:"$image"}, 
            price:{$first:"$price"}, 
            avgRating: {$avg: "$reviews.rating"}
        }},
        {$sort: {avgRating: -1}},
        {$limit: 5}
        ])
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    


    return list
    
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//     await Phone.find({ 
//         stock:{"$gte": 1},
//         disabled: "disabled"
//     })


//     let result = []

//     for(const item of list){
//         if(item.reviews.length >= 2){
//             result.push(item)
//         }
//     }



//     for(i = 1; i < result.length; i++){
//         for(j = result.length-1; j >= 1; j--){
//             let value = 0
         
//             for(const item of result[j].reviews){
//                 value += item.rating
//             }

//             value = value/result[j].reviews.length

//             result[j].reviews.unshift(value)


//             if (result[j].reviews[0] < result[j-1].reviews[0]) {
//                 var temp = result[j]
//                 result[j] = result[j-1]
//                 result[j-1] = temp
                
//             }
            

            
//         }
//     }

//     return result
    

// }


//search
async function getSearchList(query) {
    // deal with special character
    //const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#&*（）——|{}【】‘；：”“'。，、？]");
    price = query.price 
    price = price?Buffer.from(price,'base64').toString():price

    brand = query.brand
    brand = brand?Buffer.from(brand,'base64').toString():brand
    //brand = brand.replace(pattern,'');

    title = query.title
    //console.log(title)
    title = title?Buffer.from(title,'base64').toString():title
    //title = title.replace(pattern,'');

    let list

    if (price && brand && title) {
        list = await Phone.find({ 
            price:{"$lte": price},
            brand: brand,
            title: {$regex:title,$options:"$i"}
        })
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    }else if (price && brand && !title) {
        list = await Phone.find({ 
            price:{"$lte": price},
            brand: brand,
        })
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    }else if (price && !brand && title) {
        list = await Phone.find({ 
            price:{"$lte": price},
            title: {$regex:title,$options:"$i"}
        })
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    }else if (!price && brand && title) {
        list = await Phone.find({ 
            brand: brand,
            title: {$regex:title,$options:"$i"}
        })
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    }else if (!price && !brand && title) {
        list = await Phone.find({ 
            title: {$regex:title,$options:"$i"}
        })
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    }else if (!price && brand && !title) {
        list = await Phone.find({ 
            brand: brand
        })
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    }else if (price && !brand && !title) {
        list = await Phone.find({ 
            price:{"$lte": price},
        })
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    }else if (!price && !brand && !title) {
        list = await Phone.find()
        for (const item of list) {
            const brand = item.brand
            item.image = `http://localhost:3000/images/${brand}.jpeg`
            /* http://localhost:3000/images/Apple.jpeg */
            //console.log("/////////////////////////")
            console.log(item)
            console.log(brand)
        }
    }
    
    return list
}

async function getReviewerinfo(reviewer){
    const reviewerInfo = await User.findOne(
        { _id: reviewer }
    )
    return reviewerInfo
}


async function getIteminfo(query) {
    _id = query._id
    const iteminfo = await Phone.findOne({ 
        _id: _id
    })
    const brand = iteminfo.brand
    const seller = iteminfo.seller
    const sellerInfo = await getReviewerinfo(seller)
    if(sellerInfo){
        const sellername = `${sellerInfo.firstname} ${sellerInfo.lastname}`
        console.log(sellername)
        iteminfo.seller = sellername
    }else{
        const sellername = "anonymous"
        iteminfo.seller = sellername
    }

    iteminfo.image = `http://localhost:3000/images/${brand}.jpeg`
 

    //console.log(iteminfo.reviews)
    let reviews = iteminfo.reviews
    let result = []
    for (const item of reviews) {
        const reviewer = item.reviewer
        const reviewerInfo = await getReviewerinfo(reviewer)

        //result.push(reviewerInfo)
        //console.log(reviewer)
        //console.log(reviewerInfo)
        console.log(">>>>>>>>>>>>>>>>>>")
        if(reviewerInfo){
            const username = `${reviewerInfo.firstname} ${reviewerInfo.lastname}`
            console.log(username)
            result.push(username)
        }else{
            const username = "anonymous"
            result.push(username)
        }

        //const username = `${user.firstname} ${user.lastname}`

        
    }
    for (let i = 0; i < reviews.length; i++) {
        reviews[i].reviewer = result[i];
    }
    
    console.log(">>>>>>>>>>>>>>>>>>")

    iteminfo.reviews = reviews
    
    return iteminfo
}

/* async function getCheckoutItemInformation(_id) {
    const checkoutItem = await Phone.findOne({ 
        _id: _id
    })

    const brand = checkoutItem.brand
    checkoutItem.image = `http://localhost:3000/images/${brand}.jpeg`

    return checkoutItem
}
 */

async function getCheckoutTransaction(_id, number) {
    const checkoutTransaction = await Phone.findByIdAndUpdate(
        { _id: _id },
    {$inc: { stock: -number} })
    return checkoutTransaction
}


async function FindUserSellPhone(email) {
    const _id = await User.find({ 
        email: email
    },{_id:1})

    console.log(_id[0]._id)


    const userSellList = await Phone.find({
        seller: _id[0]._id
    })
    for (const item of userSellList) {
        const brand = item.brand
        item.image = `http://localhost:3000/images/${brand}.jpeg`
        /* http://localhost:3000/images/Apple.jpeg */
        //console.log("/////////////////////////")
        console.log(item)
        console.log(brand)
    }
    return userSellList
}


async function getUpdateDisableState(_id, disabled) {
    const disableState = await Phone.findOneAndUpdate(
        { _id: _id },
    {disabled: disabled },
    {
        new: true
    })
    return disableState
}

/* async function getUpdateDisableState(_id, disabled) {
    const disableState = await Phone.findOneAndUpdate(
        { _id: _id },
    {disabled: disabled },
    {
        new: true
    })
    return disableState
} */


async function createNewPhone(email, phoneInfo = {}) {
    

    const _id = await User.find({ 
        email: email
    },{_id:1})

    const newPhone = await Phone.create({
        title: phoneInfo.title,
        brand: phoneInfo.brand,
        image: phoneInfo.image,
        stock: phoneInfo.stock,
        seller: _id[0]._id,
        price: phoneInfo.price,
        disabled: phoneInfo.disabled
    })
    console.log(newPhone)
    return newPhone
    
}

async function deletePhone(_id) {
    const disableState = await Phone.findOneAndDelete(
        { _id: _id })
    return disableState
}


module.exports = {
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
    
}