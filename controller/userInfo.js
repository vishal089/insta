const userInfoModel = require('../model/userInfo');


exports.details =async (req,res)=>{
    const {name,age,dob,gender} = req.body;

    if(name && age && dob && gender){
        try{
            const doc = await userInfoModel.create({
                name:name,
                age:age,
                dob:dob,
                gender:gender
            });

            if(doc){
                
            }
        }catch(err){

        }
    }else{
        return res.status(400).json({
            status:false,
            message:"Some information is missing"
        })
    }
}

