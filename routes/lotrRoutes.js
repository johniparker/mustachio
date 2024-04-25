const express = require('express');

const router = express.Router();

const lotrController = require('../controllers/lotrController');

router.get('/', lotrController.getLotr);

router.post('/quote', lotrController.getRandomQuote);

module.exports = router;