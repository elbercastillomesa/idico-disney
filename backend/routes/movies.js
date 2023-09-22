const express = require('express')
const router = express.Router()

const {
    getAllMovieOrSeries,
    getMovieOrSeries,
    createMovieOrSeries,
    deleteMovieOrSeries,
    updateMovieOrSeries
} = require('../controllers/moviesorseries.controller')

const requireAuth = require('../middleware/requireAuth')

// Require Auth for all movies routes
router.use(requireAuth)

// GET All
router.get(
    '/',
    getAllMovieOrSeries
)

// GET single
router.get(
    '/:id',
    getMovieOrSeries
)

// POST single
router.post(
    '/',
    createMovieOrSeries
)

// DELETE single
router.delete(
    '/:id',
    deleteMovieOrSeries
)

// UPDATE single
router.patch(
    '/:id',
    updateMovieOrSeries
)

module.exports = router