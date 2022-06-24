const http = require('http');
const fs = require('fs');//음악파일은 fs가 있어야한다.

http.createServer((req,res) => {
    fs.readFile('node.png',(err,data)=>{//파일이 정상적으로 왔는가
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-Type':'image/png'});
            res.end(data);
        }
    });
}).listen(3000,() => {console.log('이미지서버실행중 ...')})

http.createServer((req,res) => {
    fs.readFile('sunny.mp3',(err,data)=>{//파일이 정상적으로 왔는가
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-Type':'audio/mp3'});
            res.end(data);
        }
    });
}).listen(3001,() => {console.log('사운드서버실행중 ...')})