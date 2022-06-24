const express = require('express');
const bodyparser = require('body-parser');
const expressSession = require('express-session'); //npm i express-session
const fs = require('fs');

const app = express();
const port = 3000;

//bodyparser라는 모듈을 app이라는 express()안에 기능을 부여
//post방식으로 데이터를 받을수 있게해줌
app.use(bodyparser.urlencoded({extended: false}));//post방식을 사용할시 필수
app.use(expressSession({
    secret:'!@#$%^&*()',//암호화
    resave:false,   //저장여부 기본false
    saveUninitialized:true    //session값을 초기화할지 안할지

}));

//session 과 cookie는 코드는 같지만 어디에 저장되는지에 따라 다르다
//로그인시도시
app.get('/login',(req,res)=>{
    fs.readFile('login.html', 'utf8', (err, data) => {// 객체가 만들어진다면
        if(!err){
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data); //데이터를 실행
        }else{
            console.log(err);
        }
    });
});

app.post('.loginOk',(req,res)=>{//폼문으로 로그인이 들어옴
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    if(userid == 'admin' && userpw == '1234'){//아이디와 패스워드가 같은지 확인
        req.session.member = { //요청된 세션의 멤버(사용자)객체
            //값비교
            id:userid,
            userpw:userpw,
            isauth:true //인증이 되었는지
        };
        res.redirect('/main'); //메인화면으로 돌아가게 함
    }else{
        res.redirect('/fail'); // 로그인 실패했을때 로그인하는 자리로 이동
    }
});

//메인화면
app.get('/main', (req, res) => {
    //인증되어있는 멤버가 있는가
    if(req.session.member){
        //검증된 session의 멤버가 있는경우
        fs.readFile('main.html', 'utf8', (err, data) => {
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data); //화면에 보냅니다
        });
    }else{//검증된 session의 멤버가 없는경우
        res.redirect('./login');
    }
});

//로그인 실패시
app.get('/fail', (req, res) => {
    fs.readFile('fail.html', 'utf8', (err, data) => {
        res.writeHead(200, {'content-type':'text/html'});
        res.end(data);
    });
});


//로그아웃을 실행했을때
app.get('/logout', (req, res) => {
    req.session.destroy(()=>{//요청된 세션삭제
        console.log('세션이 삭제되었습니다');
    });
    res.redirect('/login');//로그인페이지로 보내짐
});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});

