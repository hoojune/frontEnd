const express = require('express');
const app = express();
const port = 3000;

app.use((req,res) =>{
   // writeHead() : 응답 해더를 작성합니다 -> 형식 받는 코드(오류인가 성공인가)
   // end() : 응답본문을 작성합니다.
            //   성공         형식              한국어 깨지지않도록
    res.writeHead('200',{'content-Type':'text/html;charset=utf8'})//응답에서 값을 받음
    res.end('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>')
});

app.listen(port, () => {
    console.log(`${port}포트로 서버실행중...`)
});