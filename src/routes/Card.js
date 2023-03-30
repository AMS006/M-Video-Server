const express = require('express')
const { createCard, getAllCards, updateCard, deleteCard } = require('../controllers/Card')

const router = express.Router()

router.post('/create',createCard)

router.get('/:id',getAllCards)

router.put('/:id',updateCard)

router.delete("/:id",deleteCard)

module.exports = router