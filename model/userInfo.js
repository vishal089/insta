const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    gender:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const userInfoModel = mongoose.model('UserInfo',UserInfoSchema);

module.exports = userInfoModel;