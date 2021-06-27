const express = require('express');
const AuthController = require('../controllers/AuthController');

const AuthRouter = express.Router();

// ? Send and Recover 
AuthRouter
    .post('/login', AuthController.login)
    .post('/register', AuthController.register)
    .put('/update/', AuthController.updateUser)
    .delete('/delete', AuthController.deleteUser);

module.exports = AuthRouter;
