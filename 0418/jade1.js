const express= require('express');
const fs = require('fs');

const jade = require('jade');//npm i jade

const app = express();
const port =3000;
const router = express.Router();

router.route('/about').post((req,res)=>{
    fs.readFile('./jade1.jade','utf8',(err,data)=>{
        if(!err){   
           const jd = jade.compile(data);//파일이 변환됨
           res.writeHead(200,{'content-type':'text/html'});
           res.end(jd());//jd -> 대입 jd()-> 함수호출
        }else{
            console.log(err);
        }
    });
});

app.use('/',router);

app.all('*',(req,res)=>{
res.status(404).send('<h2>페이지를 찾울수 없습니다</h2>');
});

app.listen(port,()=>{
    console.log(`${port}포트서버 실행중`);
});