const userInfoModel = require('../model/userInfo');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const PRIVATE = process.env.PRIVATE ;


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
                const token = jwt.sign({id:doc._id},PRIVATE,{expiresIn:"2 days"});
                return res.status(200).json({
                    status:true,
                    message:"User Created",
                    token:token
                })
            }else{
                return res.status(500).json({
                    status: false,
                    message: "Some issue while Creating User"
                })
            }
        }catch(err){
            return res.status(500).json({
                status: false,
                message: "Some issue while generating OTP2"
            })
        }
    }else{
        return res.status(400).json({
            status:false,
            message:"Some information is missing"
        })
    }
}

