//connect mongoose
 const mongoose = require('mongoose')

 const url = 'mongodb://localhost:27017'
 const dbName = 'Test'
 
 mongoose.set('useCreateIndex', true)
 mongoose.set('useFindAndModify', true)
 
 // get connection
 mongoose.connect(`${url}/${dbName}`, {
     useNewUrlParser: true,
     useUnifiedTopology: false
 })

 const db = mongoose.connection
 
 db.on('error', err => {
     console.error('mongoose connect error', err)
 })

 // db.once('open', () => {
//     // test connection
//     console.log('mongoose connect success')
// })
 
 module.exports = mongoose