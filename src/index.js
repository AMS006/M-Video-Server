const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const mongoose  = require('mongoose')
const user = require('./routes/User')
const bucket = require('./routes/Bucket')
const card = require('./routes/Card')
const history = require('./routes/History')
const app = express()
app.use(express.json())
app.use(cookieparser())
dotenv.config()

app.use(cors({
    origin:'https://m-video-client.vercel.app',
    methods: ['GET', 'PUT', 'POST','DELETE'], 
    credentials: true
}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });
app.use('/user',user)
app.use('/bucket',bucket)
app.use('/card',card)
app.use('/history',history)
app.get('/',(req,res)=>{
    res.json({message:"Server Is Running"})
})
app.listen(4000,()=>{
    console.log("Server is Running on port 4000")
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log("Database connection failed" + err)
    })
})