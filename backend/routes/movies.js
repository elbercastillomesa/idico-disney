const express = require('express')
const router = express.Router()
const MoviesOrSeries = require('../models/moviesorseries.model');

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
    async (req, res) => {
        const {image, title, creationDate, rating} = req.body

        try {
            const movie = MoviesOrSeries.create({image, title, creationDate, rating})
            res.status(200).json(movie)

        } catch (error) {
            res.status(400).json(
                {error : error.message}
            )
        }
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