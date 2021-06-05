const express = require('express');
var router = express.Router();

router.get('/register', (req, res, next) => {
    res.render('register');
})

router.get('/login', (req, res, next) => {
    res.render('login');
})

module.exports = router;