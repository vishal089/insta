const reqModel = require('../model/request')

exports.sendRequest = (req,res) =>{
    const {from , to , type} = req.body;

    try{
        const doc = reqModel.create({
            from:from,
            to:to,
            type:type,
            status:"Pending"
        })
        if(doc){
            
        }
    }catch(err){

    }
}
























