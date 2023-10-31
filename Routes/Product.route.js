const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const mongoose = require('mongoose')


const Product = require('../Models/Product.model')


router.get('/', async (req, res, next) => {
    try {

        const results = await Product.find({}, { __v: 0 })
        res.send(results)
        
        // const results = await Product.find( { price: 999 } , {} )
        // const results = await Product.find({}, { name: 1 , price: 1 , _id: 0 })
    } 
    
    catch (error) {

        console.log(err.message)
        
    }
})

// Creating a New Product
router.post('/', async (req, res, next) => {
    
    try {

        const product = new Product(req.body) 
        const result = await product.save()
        res.send(result)  
    
    } catch (error) {

        console.log(error.message)

        if(error.name == 'ValidationError') {
            next(createError(422, error.message))
            return
        }

        next(error)
           
    }

    
    // const product = new Product({
    //     name: req.body.name,
    //     price: req.body.price
    // })

    // product.save()
    // .then(result => {
    //     console.log(result)
    //     res.send(result)
    // })
    // .catch(err => {
    //     console.log(err.message)
    // })

})

// Getting a Product By ID

router.get('/:id', async (req, res, next) => {

    const id = req.params.id

    try {
        
        const product = await Product.findById(id)
        // const product = await Product.findOne({ _id: id })
        
        if(!product) {

            throw createError(404, "Product Does Not Exist .... ")

        }

        res.send(product)    

    } 
    
    catch (error) {
        
        console.log(error.message)

        if(error instanceof mongoose.CastError) {
            next(createError(400, "Invalid Product Id ..... "))
            return
        }

        next(error)
    
    }



    // res.send("Getting a Signle Product ..... ")
    // next();
})

// Updating a Product By ID

router.patch('/:id', async (req, res, next) => {
    
    try {
        
        const id = req.params.id
        const updates = req.body
        const options = { new: true }

        const result = await Product.findByIdAndUpdate(id, updates, options)
        
        if(!result) {

            throw createError(400, "Product Does not Exist ...... ")

        }

        res.send(result)
        
    } 
    
    catch (error) {
        
        console.log(error.message)

        if(error instanceof mongoose.CastError) {

            return next(createError(400, "Invalid Product Id ...... "))

        }

        next(error)

    
    }

})


// Deleting a Product By ID

router.delete('/:id', async (req, res, next) => {

    const id = req.params.id
    
    try {
        
        const result = await Product.findByIdAndDelete(id) 
        console.log(result)

        if(!result) {

            throw createError(404, "Product Does Not Exist .... ")

        }

        res.send(result)

    } 
    
    catch (error) {
        
        console.log(error.message)

        if(error instanceof mongoose.CastError) {
            next(createError(400, "Invalid Product Id ..... "))
            return
        }

        next(error)
    
    }


    // res.send("Deleting a Signle Product ..... ")
})

module.exports = router;

