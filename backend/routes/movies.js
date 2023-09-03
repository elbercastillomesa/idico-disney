const express = require('express')
const {connection} = require("../config.db")

const router = express.Router()

// Testing DB Connection
const getMovies = (request, response) => {
    connection.query("SELECT * FROM MoviesOrSeries", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

router.route("/movies")
.get(getMovies);

// GET All
router.get(
    '/',
    (req, res) => {
        res.json({
            mssg: 'GET all data'
        })
    }
)

// GET single
router.get(
    '/:id',
    (req, res) => {
        res.json({
            mssg: 'GET single data'
        })
    }
)

// POST single
router.post(
    '/',
    (req, res) => {
        res.json({
            mssg: 'POST new data'
        })
    }
)

// DELETE single
router.delete(
    '/:id',
    (req, res) => {
        res.json({
            mssg: 'DELETE data'
        })
    }
)

// UPDATE single
router.patch(
    '/:id',
    (req, res) => {
        res.json({
            mssg: 'UPDATE data'
        })
    }
)

module.exports = router