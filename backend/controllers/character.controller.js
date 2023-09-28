const Character = require('../models/characters.model');
const CharacterMoviesOrSeries = require('../models/charactermoviesorseries.model');

// GET All
const getAllCharacters = async (req, res) => {

    const user_id = req.user.id
    
    const characters = await Character.findAll({
        where: {
            ...req.query,
            user_id
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

    let emptyFields = []

    if(!image) { emptyFields.push('image') }
    if(!name) { emptyFields.push('name') }
    if(!age) { emptyFields.push('age') }
    if(!weight) { emptyFields.push('weight') }
    if(!history) { emptyFields.push('history') }
    if(emptyFields.length > 0) { 
        return res.status(400).send({ 
            error: 'Please fill all fields.',
            emptyFields
        })
    }

    try {
        const user_id = req.user.id
        const character = await Character.create({image, name, age, weight, history, user_id})
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
    const {image, name, age, weight, history} = req.body
    const user_id = req.user.id
    let emptyFields = []

    if(!image) { emptyFields.push('image') }
    if(!name) { emptyFields.push('name') }
    if(!age) { emptyFields.push('age') }
    if(!weight) { emptyFields.push('weight') }
    if(!history) { emptyFields.push('history') }
    if(emptyFields.length > 0) { 
        return res.status(400).send({ 
            error: 'Please fill all fields.',
            emptyFields
        })
    }

    try {
        const character = await Character.update(
            {image, name, age, weight, history, user_id}, 
            { where: { id: id } }
        );

        if (character == false) {
            return  res.status(400).send(
                {error : "The Character ID was not found."}
            )
        }
    
        res.status(200).send(character)
        
    } catch (error) {
        res.status(400).send(
            {error : error.message}
        )        
    }    
}

module.exports = {
    getAllCharacters,
    getCharacter,
    createCharacter,
    deleteCharacter,
    updateCharacters
}