const http = require('http'); //http: 웹서버 기능을 주는 모듈
const hostname = '127.0.0.1'; //노드의 기본 주소
const port = 3000; //현재 실행하는 앱의 경로

/*서버에 요청했을떄 코드를 먼저받고
요청된 결과값에 대한 설정을 해줌*/ 
const server = http.createServer((req,res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');//응답하는 코드의 설정
    res.end('Hello world');
});

server.listen(port,hostname,() =>{
    console.log('127.0.0.1:3000실행');
})// 서버를 작동했을때 확인하는 메세지 메서드

