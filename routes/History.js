const express = require('express')
const { getAllUserHistory, addUserHistory, deleteHistory } = require('../controllers/History')

const router = express.Router()

router.post('/',addUserHistory)

router.get('/',getAllUserHistory)

router.delete('/:id',deleteHistory)

module.exports = router