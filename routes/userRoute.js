const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/', userController.createUser);
router.put('/:email', userController.updateUserLocation);
router.get('/weather/:email', userController.getWeatherByDate);

module.exports = router;
