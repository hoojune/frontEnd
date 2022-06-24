const express = require('express');
const cookieParser = require('cookie-parser');
//npm i cookie-parser

const app = express();
const port = 3000;

app.get('/setCookie',(req,res)=>{
    console.log('setCookie호출');
    //쿠키설정 '키' : '값'
    res.cookie('member',{ //member : cookie객체명
        //속성선언
        id : ' apple',  //쿠키선언방법
        name : '김사과',
        gender : 'female'
    },{                //초  분
        maxAge : 1000 * 60 * 60//만료시간설정
    });//쿠키를 생성
    res.redirect('/showCookie');//강제이동
});

app.get('/showCookie',(req,res)=>{
    console.log('showCookie호출');
    res.send(req.cookies);//서버에서 정보를 사용자에게 전달
    res.end();
});


app.listen(port,()=>{
    console.log(`${port}포트로 서버실행중...`);
})

//f12에 application에서 cookie확인가능