const express = require('express');

const {
    getAnnouncById,
    getAnnouncment,
    updateAnnouncment,
    addAnnouncment,
    deleteAnnouncment
      } = require('../controllers/announcmentController')

const router = express.Router();


router.get('/', getAnnouncment)

// get announcment by id

router.get('/:id', getAnnouncById)

// update announcment

router.put('/:id', updateAnnouncment)

// delete announcment

router.delete('/:id', deleteAnnouncment)

// send announcment to the database

router.post('/', addAnnouncment)

module.exports = router;