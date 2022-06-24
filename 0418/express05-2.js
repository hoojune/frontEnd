const express = require('express');
const bodyParser = require('body-parser');
//post데이터를 전달받기 위해 사용

const app = express();//함수
const port = 3000;

const route = express.Router();//라우터 객체선언
//익스프레스에 라우트기능이 포함되어 있음
//노드프로그램상안에서 연결해주는 기능

app.use(bodyParser.urlencoded({extended: false}));//파싱

//route객체만듦
//로그인은 body에 정보입력한다고하면
//route는 post방식으로 parameter함수 실행문으로 틀잡아야함

//포트번호 뒤에 route로 경로를 지정해주는것
route.route('/member/login').post((req,res) => {
    console.log('/member/login 호출');
});

route.route('/member/regist').post((req,res) => {
    console.log('/member/regist 호출');
});

//GET방식
route.route('/member/about').get((req,res) => {
    console.log('/member/about 호출');
});

//router를 하나의 객체로 묶어줌
app.use('/',route);//주소

//에러가 발생했을때
app.all('*',(res,req) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});


app.listen(port, () =>{
    console.log(`${port}포트로 서버실행중...`);
})