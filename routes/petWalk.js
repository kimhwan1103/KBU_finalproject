const express = require('express');

const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./checklogin');

const router = express.Router();

//회원가입
router.route('/:id')
    .get(isLoggedIn, (req, res, next) => {
        try {
            res.locals.isAuthenticated = isLoggedIn;
            res.render('petWalk');
        } catch (err) {
            console.log(err);
            next(err);
        }
    })


module.exports = router;