const express = require('express');
const app = express();
const port = 3000;

app.use((req,res) =>{
    console.log('첫번째 미들웨어 실행');
    
    console.dir(req.header);
    //dir->요청한 헤더부분 전달   
    const userAgent = req.header('User-Agent');//요청했던 header정보
    console.log(userAgent);

    //http://localhost:3000/?userid=apple

    //?userid=pappy로 쿼리문에 값을 넣으면 write에서 받아서 객체에 해당값이 들어감
    const paramName = req.query.userid; //get방식의 변수값을 가져옴
    console.log(paramName);

    //서버에 값을 요청후 화면에서 확인하는방법 ->한줄씩 출력
    res.writeHead(200, {'content-Type':'text/html;charset=utf8'});
    res.write('<h2>익스프레스 서버에서 응답한 메서지입니다,</h2>');
    res.write(`<p>User-Agent : ${userAgent}</p>`);
    res.write(`<p>paramName : ${paramName}</p>`);
    res.end();
});

app.listen(port, () => {
    console.log(`${port}포트로 서버실행중...`)
});