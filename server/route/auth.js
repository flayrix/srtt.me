const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const useragent = require('express-useragent');
// Bring in Models
let User = require('../model/user');

const router = express.Router();

// account registration api
router.post('/regiter', (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
        return res.status(400).json({
            result: 'fail',
            error: 'All fiends are required.'
        });
    } else {
        // find user email
        User.findOne({
            'email': email
        }, (err, read) => {
            if (err)
                return res.status(403).json({
                    result: 'fail',
                    error: 'Server unreachable. Please try after some time.'
                });

            // email id already exists
            if (read)
                return res.status(403).json({
                    result: 'fail',
                    error: 'Email is already in use.'
                });

            // if (read && !read.isVerified)
            //     return res.status(400).json({
            //         result: 'fail',
            //         error: 'Your email address is not verified. Please varify your ' +
            //             'email id by clicking the varification link sent to your email id'
            //     });

            //  create a new account
            let newUser = new User({
                name: name,
                email: email,
                password: password
            });

            // create password hash
            bcrypt.hash(newUser.password, 10, (err, hash) => {
                if (err)
                    return res.status(403).json({
                        result: 'fail',
                        error: 'Server unreachable. Please try after some time.'
                    });
                newUser.password = hash;
                newUser.save((err, savedUser) => {
                    if (err)
                        return res.status(403).json({
                            result: 'fail',
                            error: 'Server unreachable. Please try after some time.'
                        });
                    if (savedUser)
                        return res.status(200).json({
                            result: 'success'
                        });
                });
            });
        });
    }
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


});


module.exports = router;