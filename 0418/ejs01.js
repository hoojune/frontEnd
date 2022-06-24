const express = require('express');
const fs = require('fs');
const ejs = require('ejs'); //npm i ejs

const app = express();
const port = 3000;

const router = express.Router();

//router명 설정 post방식으로  
router.route('/ejsTest').post((req,res) => {//객체로 등록
    fs.readFile('./ejs1.ejs','utf8',(err,data)=>{//파일을 불러옴
    if(err){
        console.log(err);
    }else{ //정상적으로 불러오면
        res.writeHead(200,{'content-Type':'text/html;'});
        res.end(ejs.render(data));//치환 : ejs의 해당데이터(변수에 대입된)를 전달
        //render() : 메서드의 매개변수에 전달하고자 하는 데이터를 입력하여 전달함
    }
    });
});
 
app.use('/',router);

//에러발생시
app.all('*',(res,req)=>{
    res.status(404).send('<h2>페이지를 찾을수 없습니다</h2>');
});

app.listen(port, ()=>{
    console.log(`${port}포트로 서버 실행중....`);
});