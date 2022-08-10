const { Phone } = require('../../models/index')
!(async () => {


    // // get Phone List
    // const phoneList = await Phone.find()
    // console.log('phoneList', phoneList)

    // const leastList = await Phone.find({
    //     stock: { "$gte": 1 },
    //     disabled: "disabled"
    // }).sort({ stock: 1 }).limit(5)

    // console.log('leastList', leastList)
    // console.log(leastList.length)

    // // const leastList = await Phone.find({ 
    // //     disabled: "disabled"
    // // })

    // console.log('leastList', leastList)
    // console.log(leastList.length)




    // get a user
    const zhangsan = await Phone.find({
        seller: null
    })
    console.log('zhangsan', zhangsan)
})()