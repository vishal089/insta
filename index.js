const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io')
const io = new Server(http);
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const reqRoute = require('./routes/reqRoute');
const { socketModel , reqModel } = require('./model/request');
const userInfoModel = require('./model/userInfo')

require('dotenv').config();
var URI = process.env.URI;
var PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/v1/authenticate', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/request',reqRoute);

io.on("connection",async (socket) => {
    // console.log('socket=>', socket.id)
    try {
        const doc = await socketModel.findOneAndUpdate({ userId: socket.userID },{socketID:socket.id},{upsert:true,new:true})
    } catch (err) {
        console.log("Ask user to initialize app again",err)
    }

    socket.on('send_req',async(dataObj)=>{
        try{
            const req_doc = await reqModel.create({
                from:dataObj.sender_Id,
                to:dataObj.whom_Id,
                type:dataObj.req_type,
                status:"Pending"
            })

            const socketId = await socketModel.findOne({userId:to});
            if(socketId){
                io.to(socketId).emit('receive_req',req_doc);
            }
        }catch(err){
            socket.emit('error',err);
        }
    })

    socket.on('update_status',async(dataObj)=>{
        try{
            const update_req = await reqModel.findByIdAndUpdate({id:_id},{
                status:dataObj.status
            });
            const status = addToUserDb(dataObj);
        }catch(err){
            socket.emit("error",err)
        }
    })
});


mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connect to Database');
}).catch((err) => {
    console.log('Connection Erros is', err);
})

async function addToUserDb(obj){
    try{
        const user = await userInfoModel.findByIdAndUpdate({id:obj.from},
            {$push:{following:obj.to}});
        
        if(user){
            const update_user = await userInfoModel.findByIdAndUpdate({id:obj.to},
                {$push:{follower:obj.from}});
            
            if(update_user) return 1
        }
    }catch(err){
        return -1
    }
}



http.listen(PORT, () => {
    console.log(`App listen to port ${PORT}`);
})