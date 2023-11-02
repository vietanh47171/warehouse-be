const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('history', historySchema)
