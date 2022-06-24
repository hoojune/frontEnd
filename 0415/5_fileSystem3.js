const fs = require('fs');//파일을 다루는 모듈(읽기,쓰기)

//비동기처리는 예외처리를 할 필요없다
fs.readFile('text11.txt','utf-8',(err,data) => {
    if(err){
        console.log('에러발생! / 비동기');
    }else{
        console.log(data);
    }//비동기식은 파일이 없으므로 에러발생메세지를 띄움
});

try {//동기식은 
    const text = fs.readFileSync('text11.txt','utf-8');
    console.log(`동기식으로 읽음:${text}`);
} catch (e) {//에러발생시 
    console.log('에러발생! / 동기');
}
