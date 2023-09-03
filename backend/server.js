require('dotenv').config()
const express = require('express')

// Express App declaration.
const app = express()

// Test logger middleware
app.use(
    (req, res, next) => {
        console.log(req.path, req.method)
        next()
    }
)

// Route handler
app.get(
    '/',
    (req, res) => {
        res.json(
            {mssg: 'Welcome'}
        )
    }
)

// Request listener
app.listen(
    process.env.PORT,
    () => {
        console.log('Test listening on port 4000')
    }
)