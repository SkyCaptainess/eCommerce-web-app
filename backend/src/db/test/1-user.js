const { User } = require('../../models/index')
const md5 =require('md5');



    !(async () => {
        // Create an account
        const u1 = new User({
            firstname: "KEe",
            lastname: "Xu",
            email: "123111",
            password: md5(1231231)
        })
        u1.save() // save to database


        // // get User List
        // const userList = await User.find()
        // console.log('userList', userList)

        // get a user
        const zhangsan = await User.findOne({
            email: '123111',
            password: md5(1231231)
        })
        console.log('zhangsan', zhangsan)
    })()