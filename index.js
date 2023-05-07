const express = require('express');
const app = express();
const http = require('http').createServer(app);
const {Server} = require('socket.io')
const io = new Server(http);
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

require('dotenv').config();
var URI = process.env.URI;
var PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/v1/authenticate',authRoute);
app.use('/api/v1/user',userRoute);

io.on("connection", (socket) => {
    console.log('socket=>',socket.id)
});
global.io = io ;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('Connect to Database');
}).catch((err)=>{
    console.log('Connection Erros is',err);
})



http.listen(PORT,()=>{
    console.log(`App listen to port ${PORT}`);
})