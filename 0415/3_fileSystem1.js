const fs = require('fs');//파일을 다루는 모듈(읽기,쓰기)

//readFile은 파일이 있어야한ㄷ.
//           읽어올 파일,읽을형식,정상문으로 작동되는지의 예외문
fs.readFile('text1.txt','utf-8',(err,data)=>{//비동기(콜백)
    //예외처리 -> 비동기식 : if else
    //         -> 동기식 : try catch
    if(err){
        console.log(err);
    }else{
        console.log(`비동기식으로 읽음:${data}`);
    }
});

const text = fs.readFileSync('text1.txt','utf-8');
console.log(`동기식으로 읽음:${text}`);