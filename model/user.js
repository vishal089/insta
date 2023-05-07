const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    cretedAt:{
        type:Date,
        default:Date.now
    }
})

const OTPSchema = new mongoose.Schema({
    phone:{
        type:String,
        require:true,
        unique:true
    },
    OTP:{
        type:String,
        require:true,
        unique:true,
    },
    verified:{
        type:Boolean,
        default:false
    },
    expiry:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});



const userModel = mongoose.model('User',userSchema);
const OTPModel = mongoose.model('OTP',OTPSchema);


module.exports = {userModel,OTPModel}