const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const { isLoggedIn } = require('./checklogin');


const router = express.Router();

var locationJson = {}

router.use(
    express.json()
)

router.route('/')
    .get(isLoggedIn,(req, res, next) => {
        res.locals.isAuthenticated = isLoggedIn;
        res.locals.key = process.env.JS_KEY; //보안을 위해 키를 따로 불러옴 
        res.render('map', {key: process.env.JS_KEY}); //넌적스 출력 
    })


router.route('/xy')
    .get(isLoggedIn,(req, res, next) => {
        res.locals.isAuthenticated = isLoggedIn;
        var address = req.user.address;

        locationJson = {Address: address}; 

        console.log(`전송할 json파일 ${locationJson}`); //josn값 출력 
        res.send(locationJson); //json값 전송 
    })


module.exports = router