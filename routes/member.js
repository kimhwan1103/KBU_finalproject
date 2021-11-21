const express = require('express');

const User = require('../models/user');

const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

//회원가입
router.route('/join') 
    .get(async (req, res, next) => {
        try{
            res.render('join');
        }catch (err){
            console.log(err);
            next(err);
        } 
    })
    .post(async (req, res, next) => {
        const userData = req.body;
        console.log(userData);
        
        const user = await User.findOne({ where: { id: req.body.id } });
        if(user){
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }
        
        try{
            const hash = await bcrypt.hash(req.body.password, 12);
            await User.create({
                id: req.body.id,
                password: hash,
                name: req.body.name,
                address: req.body.address,
            });
            
            
            res.redirect('/join');
        }catch (err){
            console.log(err);
            next(err);
        }
    });


//로그인   
router.route('/login')
    .get( async (req, res, next) => {
        try{
            res.render('login');
        }catch (err) {
            console.error(err);
            next(err);
        }
    }).post( async(req, res, next) => {
        console.log(req.body);
        passport.authenticate('local', (authError, user, info) => {
            if(user) req.login(user, loginError => res.send("로그인 됨"));
            else res.send();
        })(req, res, next);
    });


module.exports = router;