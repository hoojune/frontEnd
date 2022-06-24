const fs = require('fs');//파일을 다루는 모듈(읽기,쓰기)
const data = "노드글쓰기";

//해당파일에 데이터를 넣겠다
//writeFile은 해당파일을 생성해준다. data값을 넣어서
 fs.writeFile('text2.txt',data,'utf-8',(err) =>{
    if(err){
        console.log('에러발생!');
    }else{
         console.log('저장완료 / 비동기');
    }
 });

 fs.writeFileSync('text3.txt',data,'utf-8');
 console.log('저장완료 / 동기');
