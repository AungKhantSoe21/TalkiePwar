const express = require('express');
var router = express.Router();
const md5 = require('md5');
const suffix = 'sittwe'
const db = require("../routes/dbCreate");
const Users = db.users;

// User Model
const authModel = require('../model/auth');
const User = require('../model/auth');

// register user
router.get('/register', (req, res, next) => {
    res.render('register', {
        error : ""
    });
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
        const user = new Users({    
            user_name : user_name,
            phone_number : phone_number,
            password : md5(md5(password) + suffix)
        });
        user
        .save(user)
        .then(data => {
          res.render('login')
        })
        .catch(err => {
          res.redirect('/register')
        });
    }
});

router.get('/login', (req, res, next) => {
    res.render('login');
})

module.exports = router;