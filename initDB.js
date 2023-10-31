const mongoose = require('mongoose')

module.exports = () => {

    // Data Base Connecting
    mongoose.connect('mongodb+srv://cluster0.jkvdgl1.mongodb.net/',
        {
            dbName: 'RestAPI',
            user: 'nouman',
            pass: 'qIGNU1TPQVNKCjRO',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        .then(() => {
            console.log("MongoDB Connected ...... ")
        })

        .catch(err => console.log(err.message))

    mongoose.connection.on('connected', () => {
        console.log("Mongoose Connected to Data Base ...... ")
    })

    mongoose.connection.on('error', (err) => {
        console.log(err.message)
    })

    mongoose.connection.on('disconnected', () => {
        console.log("Mongoose Connection is Disconnected ...... ")
    })

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log("Mongoose Connection is Disconnected due to App Termination ......  ")
            process.exit(0)
        })
    })
}