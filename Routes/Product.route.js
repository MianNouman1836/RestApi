const express = require('express')
const router = express.Router()

const ProductController = require('../Controllers/Product.Controller')

// Getting List of All Products
router.get('/', ProductController.getAllProducts)

// Creating a New Product
router.post('/', ProductController.createNewProduct)

// Getting a Product By ID
router.get('/:id', ProductController.findProductById)

// Updating a Product By ID
router.patch('/:id', ProductController.updateAProduct)

// Deleting a Product By ID
router.delete('/:id', ProductController.deleteAProduct)

module.exports = router;

