const { User } = require('../models/index')
const md5 =require('md5');
/**
 * creat an account
 * @param {Object} userInfo
 */
//  async function register(userInfo = {}) {
//     // email unique
//     const newUser = await User.create(userInfo)
//     return newUser
// }
 async function register(userInfo = {}) {
    // email unique
    //const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(reg.test(userInfo.email)){
        const newUser = await User.create({
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email,
            password: md5(userInfo.password)
        })
        return newUser
    }
    console.log("Not a email")
    
}

/**
 * login
 * @param {String} email
 * @param {String} password
 */
 async function login(email, password) {
    const user = await User.findOne({ email, password })
    if (user != null) {
        // login success
        return true
    }
    // login fail
    return false
}

/**
 * Find user profile
 * @param {String} email
 */
 async function FindUserByEmail(email){
    const userProfile = await User.findOne({email})
    return userProfile
}

// Modify user profile
async function updateUserProfile(email, data = {}) {
    const userProfile = await User.findOneAndUpdate(
        { email },
        { email, ...data },
        {
            new: true
        }
    )
    return userProfile
}


//check password
async function CheckUserPassword(email, password1) {
    

    const checkPassword = await User.findOne(
        { email, password: password1 }
    )
    return checkPassword
}



// Modify user password
async function updateUserPassword(email, mdoldPasswordold, mdnewPassword) {
    

    const userProfile = await User.findOneAndUpdate(
        { email, password: mdoldPasswordold },
        { email, password: mdnewPassword },
        {
            new: true
        }
    )
    return userProfile
}

module.exports = {
    register,
    login,
    FindUserByEmail,
    updateUserProfile,
    CheckUserPassword,
    updateUserPassword
}



