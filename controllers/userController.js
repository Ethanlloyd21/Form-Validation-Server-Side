const express = require('express');
const User = require('../config/user');
const router = express.Router();
const path = require('path');

const user = new User();

router.get('/', (req, res, next) => {
    res.render('index', { title: "User login" });
});


router.post('/login', (req, res, next) => {
    user.login(req.body.email, req.body.password, function (result) {
        if (result) res.send('Logged in as : ' + result.email);
        else res.send('Username/ Password incorrect!');

    })
});

router.post('/register', (req, res, next) => {

    let userInput = {
        email: req.body.email,
        password: req.body.password
    }

    user.create(userInput, function (lastId) {
        if (lastId) res.send('Welcome ' + userInput.email);
        else console.log('User can not be created!');

    });
});

module.exports = router;