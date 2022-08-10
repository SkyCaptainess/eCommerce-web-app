!(async () => {
    // Create an account
    const c1 = new User({
        userId:"ssssaaa",
        phoneDetail:{
            phondId: "aaa",
            num: 7
        }
    })
    c1.save() // save to database


})()