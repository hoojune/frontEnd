const express = require('express');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended: false}));//익스프레스에 등록
app.use(cookieParser('!@#$%^&*()'));// 암호화된 쿠키- 암호를 석었어 사용할 글자

app.get('/login', (req, res) => {//로그인을 호출
    fs.readFile('login.html', 'utf8', (err, data) => {// 객체가 만들어진다면
        if(!err){
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data); //데이터를 실행
        }else{
            console.log(err);
        }
    });
});

app.post('/loginOk', (req, res) => {//폼문으로 로그인 들어옵니다 
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(userid);
    console.log(userpw);
    
    // admin / 1234
    if(userid == 'admin' && userpw == '1234'){//아이디와 패스워드가 같은지 확인
        const expiresDay = new Date(Date.now() + (1000 * 60 * 60 * 24));//현재 날짜시간 Date.now() 24시간후 저장
        res.cookie('userid', userid, { expires: expiresDay, signed: true });
        //          사용자(키값)              완료날짜          암호화가 되어 저장
        res.redirect('/main'); //메인화면으로 돌아가게 함
    }else{
        res.redirect('/fail'); // 로그인 실패했을때 로그인하는 자리로 이동
    }
});

app.get('/main', (req, res) => {
    const cookieUserid = req.signedCookies.userid; //쿠키체크  암호된 쿠키에서 아이디를 찾아옴
    console.log(cookieUserid);
    if(cookieUserid){ //쿠키유저 아이디가 존재한다며
        fs.readFile('main.html', 'utf8', (err, data) => {
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data); //화면에 보냅니다
        });
    }else{
        res.redirect('/login');
    }
});

app.get('/fail', (req, res) => {
    fs.readFile('fail.html', 'utf8', (err, data) => {
        res.writeHead(200, {'content-type':'text/html'});
        res.end(data);
    });
});

//로그아웃을 실행했을때
app.get('/logout', (req, res) => {
    res.clearCookie("userid");
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});

