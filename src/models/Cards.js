const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    bucket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'buckets'
    },
    title:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('cards',CardSchema)
