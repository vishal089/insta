const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');

require('dotenv').config();
var URI = process.env.URI;
var PORT = process.env.PORT;

app.use(express.json());

app.use('/api/v1/authenticate',authRoute);

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('Connect to Database');
}).catch((err)=>{
    console.log('Connection Erros is',err);
})



app.listen(PORT,()=>{
    console.log(`App listen to port ${PORT}`);
})