const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model('User',userSchema);
exports.User = User;