const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.ObjectID,
        require:true
    },
    to:{
        type:mongoose.Schema.ObjectID,
        require:true
    },
    type:{
        type:String
    },
    status:{
        type:String
    }
});



const reqModel = mongoose.model("req",reqSchema);
module.exports = reqModel;