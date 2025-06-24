const express = require("express");
const jwt = require('../middleware/jwt');
const {getUsers, getUser, register, login, updateUser, deleteUser} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/getAllusers', jwt, getUsers);
router.get('/getUserById/:id', jwt, getUser);
router.put('/updateUserByid/:id', jwt, updateUser);
router.delete('/deleteUserByid/:id', jwt, deleteUser);

module.exports = router;

