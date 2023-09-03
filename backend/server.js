const express = require('express')

// Express App declaration.
const app = express()

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
    4000,
    () => {
        console.log('Test listening on port 4000')
    }
)