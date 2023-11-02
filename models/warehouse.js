const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    vietnameseName:{
        type: String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
})


module.exports = mongoose.model('product', productSchema)
