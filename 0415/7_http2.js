const http = require('http');
const fs = require('fs');//무조건 if(err,res)문기본

http.createServer((req,res) => {
    fs.readFile('test.html',(err,data)=>{//파일이 정상적으로 왔는가
        if(err){
            console.log(err);
        }else{
            res.writeHead(200,{'content-Type':'text/html'});
            res.end(data);
        }
    });
}).listen(3000,() => {console.log('서버실행중 ...')})