const express = require('express');
const app = express();
const port = 3000;

app.use((req,res) =>{
    console.log('첫번째 미들웨어 실행');
    res.redirect('http://www.naver.com');// 웹페이지의 경로를 강제로 이동시킵니다.
});

app.listen(port, () => {
    console.log(`${port}포트로 서버실행중...`)
});