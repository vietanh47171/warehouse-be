const express = require('express')
const router = express.Router()
const Product = require('../models/warehouse')
const product = require('../models/warehouse')

//Getting all
router.get('/' , async (req,res) => {
    try {
        const product = await Product.find()
        res.json(product)
    } catch (error) {
        res.status(500).json({message:err.message})
    }
})

//Getting one
router.get('/:id' , getProduct ,(req,res) => {
    res.send(res.product)
})

//Creating one 
router.post('/' , async (req,res) => {
    const product = new Product({
        name: req.body.name,
        vietnameseName: req.body.vietnameseName,
        quantity: req.body.quantity,
        price: req.body.price,
        supplier: req.body.supplier,
        from: req.body.from,
        desc: req.body.desc,
        img: req.body.img,
    })

    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Updating One
router.patch('/:id' ,getProduct, async (req,res) => {
    if(req.body.name != null) {
        res.product.name = req.body.name
    }
    if(req.body.quantity != null) {
        res.product.quantity = req.body.quantity
    }
    if(req.body.price != null) {
        res.product.price = req.body.price
    }
    if(req.body.vietnameseName != null) {
        res.product.vietnameseName = req.body.vietnameseName
    }
    if(req.body.supplier != null){
        res.product.supplier = req.body.supplier
    }
    if(req.body.from != null){
        res.product.from = req.body.from
    }
    if(req.body.desc != null){
        res.product.desc = req.body.desc
    }
    if(req.body.img != null){
        res.product.img = req.body.img
    }
    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Deleting One
router.delete('/:id' , getProduct , async (req,res) => {
    try {
        await res.product.deleteOne()
        res.json({message:'Deleted product'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getProduct (req,res,next){
    let product
    try {
        product = await Product.findById(req.params.id)
        if(product == null){
            return res.status(404).json({message:'Cannot find'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.product = product
    next()
}

module.exports = router