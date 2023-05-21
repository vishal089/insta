const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
    from:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    },
    type:{
        type:String
    },
    status:{
        type:String
    }
});

const socketSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
        unique:true
    },
    socketID:{
        type:String,
        require:true
    }
})



const reqModel = mongoose.model("req",reqSchema);
const socketModel = mongoose.model("socket",socketSchema);
module.exports = {reqModel,socketModel};