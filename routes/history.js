const express = require('express')
const router = express.Router()
const History = require('../models/history')
const history = require('../models/history')

//Getting all
router.get('/' , async (req,res) => {
    try {
        const history = await History.find()
        res.json(history)
    } catch (error) {
        res.status(500).json({message:err.message})
    }
})

//Getting one
router.get('/:id' , getHistory ,(req,res) => {
    res.send(res.history)
})

//Creating one 
router.post('/' , async (req,res) => {
    const history = new History({
        name: req.body.name,
        status: req.body.status,
        quantity: req.body.quantity,
        price: req.body.price,
        date: req.body.date,
    })

    try {
        const newHistory = await history.save()
        res.status(201).json(newHistory)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Updating One
router.patch('/:id' ,getHistory, async (req,res) => {
    if(req.body.name != null) {
        res.history.name = req.body.name
    }
    if(req.body.status != null) {
        res.history.status = req.body.status
    }
    if(req.body.quantity != null) {
        res.history.quantity = req.body.quantity
    }
    if(req.body.price != null) {
        res.history.price = req.body.price
    }
    if(req.body.date != null) {
        res.history.date = req.body.date
    }
    try {
        const updatedHistory = await res.history.save()
        res.json(updatedHistory)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Deleting One
router.delete('/:id' , getHistory , async (req,res) => {
    try {
        await res.history.deleteOne()
        res.json({message:'Deleted history'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


async function getHistory (req,res,next){
    let history
    try {
        history = await History.findById(req.params.id)
        if(history == null){
            return res.status(404).json({message:'Cannot find'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.history = history
    next()
}

module.exports = router