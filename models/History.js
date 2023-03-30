const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    card:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cards",
        required:true
    }
},
    {timestamps:true}
)
module.exports = mongoose.model('history',HistorySchema)