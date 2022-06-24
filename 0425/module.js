const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;

//view 엔진 등록, ejs파일이 자동으로  html파일로 변환 -> views폴더가 공식이다.
//views폴더에서 자동으로 불러와진다.
app.engine('html',require('ejs').renderFile); //ejs파일을 랜더링하여 html확장자로 변환
app.use(bodyparser.urlencoded({extended: false}));

//index페이지 
const module1 = require('./router/module1')(app,fs);
//module1에서 router로 하나씩 연결한다.
//(모듈객체명)-모듈객체를사용하게 객체로 전달

//인트로 페이지작업
app.listen(port, ()=>{
    console.log(`${port}번 포트로 서버 실행중...`);
});
//인트로파일작업끝