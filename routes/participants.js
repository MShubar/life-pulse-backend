const express = require('express');
const router = express.Router();
const participantsController = require('../controllers/participants');
const verifyToken = require('../middleware/participant');

router.get('/', participantsController.getAllParticipants);
router.post('/', participantsController.postParticipants);
router.put('/:id',verifyToken, participantsController.postScoreParticipants);
router.post('/login', participantsController.postLogin);

module.exports = router;