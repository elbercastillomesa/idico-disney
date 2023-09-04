require('dotenv').config()

const express = require('express')
const workoutRouters = require('./routes/movies')

// Express App declaration.
const app = express()

// Middleware
app.use(express.json())

// Test logger middleware
app.use(
    (req, res, next) => {
        console.log(req.path, req.method)
        next()
    }
)

// Route handler
app.use('/api/movies',  workoutRouters)

// Request listener
app.listen(
    process.env.PORT,
    () => {
        console.log('Test listening on port 4000')
    }
)