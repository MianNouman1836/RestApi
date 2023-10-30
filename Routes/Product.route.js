const express = require('express')
const router = express.Router()

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

router.post('/', async (req, res, next) => {
    
    try {

        const product = new Product(req.body) 
        const result = await product.save()
        res.send(result)  
    
    } catch (error) {

        console.log(err.message)
           
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

router.get('/:id', async (req, res, next) => {

    const id = req.params.id

    try {
        
        const product = await Product.findOne()
        // const product = await Product.findById(id)
        res.send(product)    

    } 
    
    catch (error) {
        
        console.log(error.message)
    
    }



    // res.send("Getting a Signle Product ..... ")
    // next();
})

router.patch('/:id', (req, res, next) => {
    res.send("Updating a Signle Product ..... ")
})

router.delete('/:id', (req, res, next) => {
    res.send("Deleting a Signle Product ..... ")
})

module.exports = router;

