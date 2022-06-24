const express = require('express');
const bodyParser = require('body-parser');
//post데이터를 전달받기 위해 사용
//클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출합니다.

const app = express();//함수
const port = 3000;

//미들웨어 함수는 req(요청) 객체, res(응답) 객체, 그리고 어플리케이션 요청-응답 사이클 도중
// 그 다음의 미들웨어 함수에 대한 엑세스 권한을 갖는 함수이다.
//미들웨어란 간단하게 말하면 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하려는 중간(미들)에 목적에 맞게 처리를 하는, 
//말하자면 거쳐가는 함수들이라고 보면 되겠다.

//extended 는 중첩된 객체표현을 허용할지 말지를 정하는 것이다. 객체 안에 객체를 파싱할 수 있게하려면 true.
//bodyParser 미들웨어의 여러 옵션 중에 하나로 false 값일 시 node.js에 
//기본으로 내장된 queryString, true 값일 시 따로 설치가 필요한 npm qs 라이브러리를 사용한다.

app.use(bodyParser.urlencoded({extended: false}));//파싱
app.use((req,res) => {
    //body안의 변수를 요청 -> post
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;

    //화면에 보이는부분 주소창에 값을 넣으면 대입된다.
    res.writeHead(200, {'content-Type':'text/html;charset=utf8'});
    res.write('<h2>익스프레스 서버에서 응답하는 메세지입니다.</h2>');
    res.write(`<p>아이디: ${userid}</p>`);
    res.write(`<p>비밀번호: ${userpw}</p>`);
    res.write(`<p>이름: ${name}</p>`);
    res.end();
});

app.listen(port, () =>{
    console.log(`${port}포트로 서버실행중...`);
})