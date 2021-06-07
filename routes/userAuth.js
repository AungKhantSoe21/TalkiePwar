const express = require('express');
var router = express.Router();
const md5 = require('md5');
const suffix = 'sittwe'

// User Model
const authModel = require('../model/auth');

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
    let errors = [];

    if(!user_name || !phone_number || !password || !password2){
        errors.push({ msg: 'Please fill in all fields' })
    }

    if(password.length < 6){
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    if(password != password2){
        errors.push({ msg: 'Passwords do not match' })
    }

    if(errors.length > 0 ) {
        res.render('register', { 
            errors,
            user_name,
            phone_number,
            password,
            password2
         })
    } else {
        // Validation passed
        authModel.findOne({ phone_number: phone_number })
        .then(user => {
            console.log(user)
            if(user) {
                // User exits
                errors.push({ msg: 'Phone number is already registered' })
                res.render('register', { 
                    errors,
                    user_name,
                    phone_number,
                    password,
                    password2
                 })
            } else {
                const newUser = new user ({
                    user_name,
                    phone_number,
                    password
                })

                console.log(newUser)
            }
        });
    }
    
});

module.exports = router;