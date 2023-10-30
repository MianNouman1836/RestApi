const express = require('express')
const router = express.Router()

const Product = require('../Models/Product.model')


router.get('/', (req, res, next) => {
    next(new Error("Cannot Get All Products List ..... "))
    // res.send("Getting the List of All Products ..... ")
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

router.get('/:id', (req, res, next) => {
    res.send("Getting a Signle Product ..... ")
    next();
})

router.patch('/:id', (req, res, next) => {
    res.send("Updating a Signle Product ..... ")
})

router.delete('/:id', (req, res, next) => {
    res.send("Deleting a Signle Product ..... ")
})

module.exports = router;

