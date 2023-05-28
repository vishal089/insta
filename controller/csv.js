const userInfoModel = require("../model/userInfo");
const {OTPModel} = require("../model/user")
const csv = require("csvtojson");
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("data.csv");


const csvImport = (req,res)=>{
    csv().fromFile(req.file.path).then(async(jsonObj)=>{
        try{
            const docs = await userInfoModel.insertMany(jsonObj);
            return res.status(200).json({
                status:true,
                message:"CSV file import successfully"
            })
        }catch(err){
            return res.status(501).json({
                status:false,
                message:err
            })
        }
    })
}

const csvExport = (req,res)=>{
    OTPModel.find({}).then((dataObj)=>{
        
        res.setHeader('Content-Type', 'text/csv');
        const csvStream = fastcsv.format({headers:true});

        csvStream.pipe(res);

        dataObj.map((data)=>{
            csvStream.write({
                Phone:data.phone,
                OTP:data.OTP,
                created:data.createdAt
            })
        })

        csvStream.end();
    }).catch((err)=>{
        return res.status(501).json({
            status:false,
            message:err
        })
    })
}

module.exports = {csvImport,csvExport};