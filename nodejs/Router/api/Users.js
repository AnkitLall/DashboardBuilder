const express = require('express');
const router = express.Router();
const User = require('./../../Models/User');

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.status(400).json({errorMsg: 'User with this Email already exists!!'});
            }else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                newUser.save()
                    .then(user => {                        
                        res.json(user)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
});

router.post('/login', (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.status(400).json({errorMsg: 'User does not exists'});
            }
            
            if(req.body.password === user.password) {
                return res.json({
                    name: user.name,
                    email: user.email
                });
            }else {
                return res.status(400).json({errorMsg: 'Password is incorrect'});
            }
        });
});

module.exports = router;