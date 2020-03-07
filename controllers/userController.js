const express = require('express');
const User = require('../config/user');
const router = express.Router();


const user = new User();

router.get('/', (req, res, next) => {
    let user = req.session.user;

    if (user) {
        res.redirect('/home');
        return;
    }
    res.render('index', { title: "users login" });
});

router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if (user) {
        res.render('home', { opp: req.session.opp, name: user.email });
        return;
    }
    res.redirect('/');
})

router.post('/login', (req, res, next) => {
    user.login(req.body.email, req.body.password, function (result) {
        if (result) {
            req.session.user = result;
            req.session.opp = 1;

            res.redirect('/home');
        } else {
            res.send('Username/ Password incorrect!');
        }

    })
});

router.post('/register', (req, res, next) => {

    let userInput = {
        email: req.body.email,
        password: req.body.password
    };

    user.create(userInput, function (lastId) {
        if (lastId) {
            user.find(lasId, function (result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/home');
            })
        } else console.log('User can not be created!');

    });
});

router.get('/loggout', (req, res, next) => {

    if (req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function () {
            res.redirect('/');
        });
    }
});


module.exports = router;