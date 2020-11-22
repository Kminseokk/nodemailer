const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); //dotenv파일에서 콘피그함수 호출.
const crypto = require('crypto');

router.post('/post', function(req, res, next){
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    }
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,    // 발송 메일 주소
    to: '받는 사람의 이메일 주소를 입력.' ,     // 수신 메일 주소
    subject: '인증 테스트',   // 제목
    html: ''
      // 내용
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.redirect("/");
})

module.exports = router
