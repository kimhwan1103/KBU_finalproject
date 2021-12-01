const express = require('express'); //express 모듈을 불러옴
const multer = require('multer');

const Pet = require('../models/pet'); // models 폴더에 comment.js 파일을 불러옴
const fs = require('fs');


const { isLoggedIn } = require('./checklogin'); // helper.js에서 isLoggendIn 불러옴
const path = require('path');
const router = express.Router();


try {
    fs.readdirSync('uploads');
  } catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
  
  const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, txt) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });

router.route('/enrollment')
    .get( isLoggedIn, (req, res, next) => {
        try{
            res.locals.isAuthenticated = isLoggedIn; //로그인이 되었는지 안됬는지(nav.html 로그인 유지 때매 사용)
            // res.locals.user = req.user;
            res.render('petenrollment');
        }catch(err){
            console.log(err);
            next(err);
        }
    })
    .post( upload.single('img'), async(req, res, next) => {
        const userId = req.user.id;
        //userId, petName, petKind 같은 것을 찾기 위한 변수
        const pet = await Pet.findOne({where: { userId: userId, petName: req.body.petName, petKind: req.body.petKind } }); 
        console.log(req.body.url);
        try{
            if(pet){
                next('이미 등록된 반려동물입니다.');
                return;
            }
            
            await Pet.create({
                    petKind: req.body.petKind,
                    petName: req.body.petName,
                    petAge: req.body.petAge,
                    petWeight: req.body.petWeight,
                    userId: userId,
                    img: req.body.url,
            });

            res.redirect('/enrollment');

        }catch (err) {// 에러처리
            console.error(err);
            next(err);
        }
    });

module.exports = router;
