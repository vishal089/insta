
require('dotenv').config();
const PRIVATE = process.env.PRIVATE

exports.verify = (req,res,next) =>{
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token){
        return res.status(403).json({
            status:false,
            message:"A token is required for authentication"
        })
    }

    try{
        const decode = jwt.verify(token,PRIVATE);
        console.log('decode=>',decode);
    }catch(err){
        return res.status(401).json({
            status:false,
            message:"A token is invlaid"
        })
    }

    return next();

}