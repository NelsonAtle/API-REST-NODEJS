var express = require('express');
const router = express.Router();
const User = require('../controllers/user_controller.js');

//USERS
router.post('/user', User.create);
router.get('/users', User.getUsers);
router.get('/user/:email/:password', User.getUser);
router.patch('/user/:id', User.update);

module.exports = router;
