const MoviesOrSeries = require('../models/moviesorseries.model');
const Genre = require('../models/genre.model');
const GenreMoviesOrSeries = require('../models/genremoviesorseries.model');

// GET All
const getAllMovieOrSeries = async (req, res) => {
    
    const movies = await MoviesOrSeries.findAll({
        where: {
            ...req.query
        },
        order: [['createdAt', 'DESC']] 
      });

    res.status(200).send(movies)
}

// GET single
const getMovieOrSeries = async (req, res) => {
    const { id } = req.params

    const movies = await MoviesOrSeries.findOne({ 
        where: { id: id } 
    })

    if (!movies) {
        return  res.status(404).send(
            {error : "Movie or Series ID not found."}
        )
    }

    res.status(200).send(movies)
}

// POST single
const createMovieOrSeries = async (req, res) => {
    const {image, title, creationDate, rating} = req.body

    let emptyFields = []

    if(!image) { emptyFields.push('image') }
    if(!title) { emptyFields.push('title') }
    if(!creationDate) { emptyFields.push('creationDate') }
    if(!rating) { emptyFields.push('rating') }
    if(emptyFields.length > 0) { 
        return res.status(400).send({ 
            error: 'Please fill all fields.',
            emptyFields
        })
    }

    try {
        const movie = await MoviesOrSeries.create({image, title, creationDate, rating})

        console.log(movie)

        res.status(200).send(movie)

    } catch (error) {
        res.status(400).send(
            {error : error.message}
        )
    }
}

// DELETE single
const deleteMovieOrSeries = async (req, res) => {
    const { id } = req.params

    const movies = await MoviesOrSeries.destroy({ 
        where: { id: id } 
    })

    console.log(movies)

    if (movies == false) {
        return  res.status(400).send(
            {error : "Movie or Series ID not found."}
        )
    }

    res.sendStatus(200).send(movies)
}

// UPDATE single
const updateMovieOrSeries = async (req, res) => {
    const { id } = req.params

    const movies = await MoviesOrSeries.update(
        {...req.body}, 
        { where: { id: id } }
    );

    if (movies == false) {
        return  res.status(400).send(
            {error : "Movie or Series ID not found."}
        )
    }

    res.status(200).send(movies)
}

module.exports = {
    getAllMovieOrSeries,
    getMovieOrSeries,
    createMovieOrSeries,
    deleteMovieOrSeries,
    updateMovieOrSeries
}