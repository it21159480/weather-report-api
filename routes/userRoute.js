const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes
router.post('/', userController.createUser);
router.put('/:id', userController.updateUserLocation);
router.get('/weather/:id', userController.getWeatherByDate);
router.get('/getAll', userController.getAllUsers);
module.exports = router;
