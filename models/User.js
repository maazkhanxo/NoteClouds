const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String , required:true, unique : true},
    password: String    
})

module.exports = mongoose.model('user',userSchema)