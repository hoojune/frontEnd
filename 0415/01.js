const http = require('http');

const hostname = '127.0.0.1';
const port = 3000; //해당주소의 포트(앱주소)

const server = http.createServer((req, res) =>{
    res.statusCode =200;
    res.setHeader('content-type', 'text/plain');//MIME방식 : 'text/plain'
    res.end('Hello world');
});
//서버요청해서 실행시 해당되는 상태,정상적인요청인지 알려줌
server.listen(port,hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
});
 