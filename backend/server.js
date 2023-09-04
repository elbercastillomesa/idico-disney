require('dotenv').config()

const express = require('express')
const moviesOrSeriesRouters = require('./routes/movies')
const characterRouters = require('./routes/characters')

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
app.use('/movies',  moviesOrSeriesRouters)
app.use('/characters',  characterRouters)

// Request listener
app.listen(
    process.env.PORT,
    () => {
        console.log('Test listening on port 4000')
    }
)