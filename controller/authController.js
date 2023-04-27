const User = require('../model/user');


const signup = (req,res)=>{
    let {email , password } = req.body;
    
    try{
        if(email && password){
            
        }else{
            //send res with field is missing
        }
    }catch(err){

    }
}