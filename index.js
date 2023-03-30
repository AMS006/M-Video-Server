const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const { default: mongoose } = require('mongoose')
const user = require('./routes/User')
const bucket = require('./routes/Bucket')
const card = require('./routes/Card')
const history = require('./routes/History')
const app = express()
app.use(express.json())
app.use(cookieparser())
dotenv.config()

app.use(cors({
    origin:'http://localhost:3000',  
    credentials: true,
    optionSuccessStatus:200
}))
// app.get("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Max-Age", "1800");
//     res.setHeader("Access-Control-Allow-Headers", "content-type");
//     res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
//      });
app.use('/user',user)
app.use('/bucket',bucket)
app.use('/card',card)
app.use('/history',history)

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