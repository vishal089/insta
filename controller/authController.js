const { userModel, OTPModel } = require('../model/user');
const bcrypt = require('bcrypt');
const OtpGenerator = require('otp-generator');
const saltRounds = 10;

require('dotenv').config();
const SID = process.env.TWILIO_ACCOUNT_SID
const Token = process.env.TWILIO_AUTH_TOKEN
const PhoneNumber = process.env.TWILIO_NUMBER

exports.signup = async (req, res) => {
    const { email, password } = req.body;


    try {
        if (email && password) {
            let pass_enc = await bcrypt.hash(password, saltRounds);

            let userExist = await userModel.findOne({ email: email })
            if (userExist) {
                res.status(200).json({
                    status: false,
                    message: "Already have user"
                })
            } else {
                userModel.create({
                    email: email,
                    password: pass_enc
                }).then((user) => {
                    res.status(200).json({
                        status: true,
                        message: user._id
                    })
                }).catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "Error"
                    })
                })
            }
        } else {
            res.send(505).json({
                status: false,
                message: "Some field is missing"
            })
        }
    } catch (err) {
        res.send(500).json({
            status: false,
            message: err
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email && password) {
            let userExsit = await userModel.findOne({
                email: email
            });
            if (userExsit) {
                let validPass = bcrypt.compare(password, userExsit.password);
                if (validPass) {
                    res.status(200).json({
                        status: true,
                        message: "Login Success"
                    })
                } else {
                    res.status(200).json({
                        status: false,
                        message: "Wrong password"
                    })
                }
            } else {
                res.status(200).json({
                    status: false,
                    message: "No email id found"
                })
            }
        } else {
            res.send(505).json({
                status: false,
                message: "Some field is missing"
            })
        }
    } catch {
        (err) => {
            res.send(500).json({
                status: false,
                message: err
            })
        }
    }
}

exports.sendOTP = async (req, res) => {
    const { phone } = req.body;

    let currentTime = new Date();

    if (!phone) {
        return res.status(400).json({
            status: false,
            message: "Phone Number required"
        })
    }

    const expiry = addMinute(currentTime, 5);
    console.log('expiry=>',expiry);
    const OTP = OtpGenerator.generate(6);
    const enc_OTP = await bcrypt.hash(OTP, saltRounds);

    try {
        const doc = await OTPModel.findOneAndUpdate({phone:phone},{
            phone: phone,
            OTP: enc_OTP,
            expiry: expiry
        },{new:true,upsert:true});

        if (doc) {
            const client = require('twilio')(SID, Token);
            const message = `Your OTP is ${OTP}`;

            let object = {
                phone:phone,
                id:doc._id,
                timestamp:expiry,
                success:true,
                otp:doc.OTP
            }
            client.messages
                .create({
                    body: message,
                    from: PhoneNumber,
                    to: phone
                })
                .then((response)=>{
                    return res.status(200).json({
                        status:true,
                        message:"OTP Sent Successfully",
                        data:object
                    })
                });
        }else{
            return res.status(500).json({
                status: false,
                message: "Some issue while generating OTP1"
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Some issue while generating OTP2"
        })
    }
}


exports.verifyOTP =async (req,res)=>{
    const { OTP , data ,currentTime} = req.body;

    if(!OTP){
        return res.status(400).json({
            status: false,
            message: "OTP is required"
        })
    }

    if(!currentTime){
        return res.status(400).json({
            status: false,
            message: "Current time is required"
        })
    }

    if(!data){
        return res.status(400).json({
            status: false,
            message: "date is required"
        })
    }

    const id = data.id;
    try{
        const doc = await OTPModel.findById(id);
        if(checkOTPValid(Number(currentTime),Number(doc.expiry))){
            let verifyOTP =await bcrypt.compare(OTP,doc.OTP);
            if(verifyOTP){
                return res.status(200).json({
                    status:true,
                    message:"OTP verified Successfully"
                })
            }else{
                return res.status(200).json({
                    status:true,
                    message:"Your OTP is invalid"
                })
            }
        }else{
            return res.status(200).json({
                status:false,
                message:"Your OTP is expires"
            })
        }
    }catch(err){
        return res.status(500).json({
            status:false,
            message:err
        })
    }
}




function addMinute(date, minute) {
    return date.getTime() + minute * 60 * 1000;
}


function checkOTPValid(currentTime,expiry){
    console.log(typeof(currentTime),currentTime);
    console.log(typeof(expiry),expiry);
    return currentTime < expiry
}

