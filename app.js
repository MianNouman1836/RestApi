const express = require('express')
const createError = require('http-errors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initialize Data Base
require('./initDB') ()

app.all('/test', (req, res) => {

    console.log(req.body)
    res.send(req.body)
    // console.log(req.params)
    // res.send(req.params)
    // console.log(req.query)
    // console.log(req.query.name)
    // res.send(req.query)
})

const ProductRoute = require('./Routes/Product.route')
app.use('/products', ProductRoute)
// 404 Handler & Pass to Error Handler
app.use((req, res, next) => {
    next(createError(404, "Not Found ...... "))
    // const err = new Error("Not Found ...... ")
    // err.status = 404
    // next(err)
})

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})


app.listen(3000, () => {
    console.log("The Server Started on Port : 3000 ..... ")
})
