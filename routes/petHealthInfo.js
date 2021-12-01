const express = require('express');

const User = require('../models/user');
const Pet = require('../models/pet');
const { isLoggedIn, isNotLoggedIn } = require('./checklogin');

const router = express.Router();

//회원가입
router.route('/')
    .get(isLoggedIn, async (req, res, next) => {
        const user = req.user.id;
        console.log(user);
        try {
            const pet = await Pet.findAll
            ({
                where: {userId: user}
            });
            res.locals.isAuthenticated = isLoggedIn;
            res.locals.pet = pet;
            res.render('petHealthInfo');
        } catch (err) {
            console.log(err);
            next(err);
        }
    })


module.exports = router;