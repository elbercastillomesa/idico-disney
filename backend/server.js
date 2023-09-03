require('dotenv').config()

const express = require('express')
const mysql = require('mysql')
const workoutRouters = require('./routes/movies')

// Express App declaration.
const app = express()


const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dbuser',
  password : 's3kreee7'
});

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