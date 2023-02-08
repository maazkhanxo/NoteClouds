const mongoose = require('mongoose')
// const url1 = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const url= "mongodb+srv://maazkhanxo:maaz123@cluster0.rd0pt.mongodb.net/notescloud?retryWrites=true&w=majority"

let connectionToMongo = ()=>{
    mongoose.connect(url,()=>{
       console.log("connected to mongoDb")
    })
}

module.exports = connectionToMongo