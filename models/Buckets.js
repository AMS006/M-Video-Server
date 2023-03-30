const mongoose = require('mongoose')

const BucketSchema = new mongoose.Schema({
    img:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('buckets',BucketSchema)
