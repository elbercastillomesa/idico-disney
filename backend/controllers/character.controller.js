const Character = require('../models/characters.model');
const CharacterMoviesOrSeries = require('../models/charactermoviesorseries.model');

// GET All
const getAllCharacters = async (req, res) => {
    
    const characters = await Character.findAll({
        where: {
            ...req.query
        },
        order: [['createdAt', 'DESC']] 
      });

    res.status(200).send(characters)
}

// GET single
const getCharacter = async (req, res) => {
    const { id } = req.params

    const characters = await Character.findOne({ 
        where: { id: id } 
    })

    if (!characters) {
        return  res.status(404).send(
            {error : "The Character ID was not found."}
        )
    }

    res.status(200).send(characters)
}

// POST single
const createCharacter = async (req, res) => {

    const {image, name, age, weight, history} = req.body

    try {
        const character = await Character.create({image, name, age, weight, history})
        res.status(200).send(character)

    } catch (error) {
        res.status(400).send(
            {error : error.message}
        )
    }
}

// DELETE single
const deleteCharacter = async (req, res) => {
    const { id } = req.params

    const character = await Character.destroy({ 
        where: { id: id } 
    })

    console.log(character)

    if (character == false) {
        return  res.status(400).send(
            {error : "The Character ID was not found."}
        )
    }

    res.sendStatus(200).send(character)
}

// UPDATE single
const updateCharacters = async (req, res) => {
    const { id } = req.params

    const character = await Character.update(
        {...req.body}, 
        { where: { id: id } }
    );

    if (character == false) {
        return  res.status(400).send(
            {error : "The Character ID was not found."}
        )
    }

    res.status(200).send(character)
}

module.exports = {
    getAllCharacters,
    getCharacter,
    createCharacter,
    deleteCharacter,
    updateCharacters
}