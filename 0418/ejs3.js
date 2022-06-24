const express = require('express');
const fs = require('fs');//순서지켜야함
const ejs = require('ejs');

const app = express();
const port =3000;
const router = express.Router();

//둥기식으로 읽는다
const header = fs.readFileSync('./header.ejs','utf8');
const body = fs.readFileSync('./body.ejs','utf8');

router.route('/about').post((req,res) => {
    //header안에 content를 집어넣는식이다. ejs파일을 새로운 ejs파일안에 넣을수 있다.
    //title은 변수 -> content부분은 ejs파일에서 태그포함 txt형식으로 넣는다
    const html = ejs.render(header,{title :'매개변수로 전달된 제목입니다.',content:ejs.render(body,{message:'매개변수로 전달된 텍스트 메세지입니다.'})});
    res.writeHead(200, {'content-type':'text/html'});
    res.end(html);
});

app.use('/',router);

//주소 잘못입력시
app.all('*',(req,res) =>{
    res.status(404).send('<h2>페이지를 찾을수 없습니다</h2>')
});

app.listen(port,() =>{
    console.log(`${port}포트로 서버실행중`)
});