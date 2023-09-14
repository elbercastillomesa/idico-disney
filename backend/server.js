require('dotenv').config()

const express = require('express')
const cors = require("cors")
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

// CORS domains configuration.
const port = process.env.PORT || 3000
const domainsFromEnv = process.env.CORS_DOMAINS || ""
const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

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