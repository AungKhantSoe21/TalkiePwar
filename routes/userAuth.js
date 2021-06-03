const express = require('express');
var router = express.Router();

router.get('/register', (req, res, next) => {
    res.render('register', {
        error : ""
    });
})

router.get('/login', (req, res, next) => {
    res.render('login');
})

router.post('/register', (req, res) => {
    const { user_name, phone_number, password, password2 } = req.body;
    
    if(!user_name || !phone_number || !password || !password2){
        return res.render('register', {
            error : "Please fill in all fields"
        })
    }

    if(password.length < 6){
        return res.render('register', {
            error : "Password should be at least 6 characters"
        })
    }

    if(password != password2){
        return res.render('register', {
            error : "Passwords do not match"
        })
    }
    
})

module.exports = router;