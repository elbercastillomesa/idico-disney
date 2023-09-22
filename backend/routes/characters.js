const express = require('express')
const router = express.Router()

const {
  getAllCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
  updateCharacters
} = require('../controllers/character.controller')

const requireAuth = require('../middleware/requireAuth')

// Require Auth for all characters routes
router.use(requireAuth)

// GET All
router.get(
    '/',
    getAllCharacters
)

// GET single
router.get(
    '/:id',
    getCharacter
)

// POST single
router.post(
    '/',
    createCharacter
)

// DELETE single
router.delete(
    '/:id',
    deleteCharacter
)

// UPDATE single
router.patch(
    '/:id',
    updateCharacters
)

module.exports = router