const express = require('express');
const app = express();
const port = 3000;

//127.0.0.1:3000
//로컬이기때문에 localHost:3000

app.get('/',(req,res) => {// get은 무조건 / 사용 '/'는 경로설정
    res.send('익스프레스 서버 테스트');
    //화면에 나타남
});

app.listen(port,() =>{
    console.log(`${port}포트로 서버 실행중`);
});
//`` 를 사용하면 ${변수명}이면 객체이므로 변수명의 값을 나타냄