const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan'); //로깅을 도와주는 모듈 npm i morgan
//로깅: 현재앱에서 일어나는 일들을 기록하는것을 의미
const mongooes = require('mongoose');//npm i mongoose

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

//데이터베이스 연결
let database;
let UserSchema;
let UserModel;

function connentDB(){
    const url = "mongodb://127.0.0.1:27017/frontenddb";
    console.log('데이터베이스 연결시도중...');


    mongooes.Promise = global.Promise;
    //몽구스의 프로미스 객체를 global의 프로미스 객체로 상용 동기식이더라도 비동기식으로 사용
    mongooes.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
    database = mongooes.connection;
    //에러가 발생했다면  콘솔에 error메세지연결
    database.on('error', console.error.bind(console, "mongoose 연결 실패"));//bind : 연결
    database.on('open',()=>{ //db열렸을때
        console.log('데이터베이스 연결성공');
        //collection
        UserSchema = mongooes.Schema({
            userid:String,
            userpw:String,
            name:String,
            gender:String
        });
        console.log('UserSchema 생성완료!');

        //가상의 함수를 생성 list생성시 사용
        UserSchema.static('findAll',function(){
            return this.find({},callback);
        });

        //모델 생성
        UserModel = mongooes.model('user',UserSchema);
        console.log('UserModel이 정의되었습니다.');
    });
};

// http://localhost:3000/user/regist (post)
 router.route('/user/regist').post((req,res) => {
    console.log('/user/regist 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name}, gender:${gender}`);
    //post 방식으로 입력된 내용 확인
    if(database){//데이터베이스 연결여부 확인 -> 참이냐 거짓이냐
        joinUser(database,userid, userpw, name, gender,(err,result)=>{//콜백함수의 파라미터

            if(!err){//회원가입실행함수연결여부 확인
                if(result){ //insert가 되었다면 
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.end();   
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.end();
                }
            }else{//회원가입실패
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>서버에러...회원가입 실패</h2>');
                res.end(); 
            }
        })
    }else{//연결실패
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
})

//로그인
//http://localhost:3000/user/login (post)
router.route('/user/login').post((req,res) =>{
    console.log('/user/login 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid},userpw:${userpw}`);

    if(database){
        loginUser(database,userid,userpw,(err,result) => {
            if(!err){
                if(result){
                    console.dir(result);
                    const name = result[0].name;
                    const gender = result[0].gender;

                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>로그인 성공</h2>');
                    res.write(`<p>아이디: ${userid}</p>`);
                    res.write(`<p>아름: ${name}</p>`);
                    res.write(`<p>성별: ${gender}</p>`);
                    res.write('<p>회원가입 성공</p>');
                    res.end(); 
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.end();
                }
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>서버에러...로그인 실패</h2>');
                res.end(); 
            }
        });
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
});

const joinUser = function(database,userid, userpw, name, gender,callback){
    console.log('joinUser 호출!');
    const users = new UserModel({userid:userid,userpw:userpw,name:name,gender:gender});

    users.save((err,result) => {
        if(!err){
            console.log('회원 documnet가 추가되었습니다');
            callback(null,result);
            return;
        }
        callback(err,null);
    });

}

const loginUser = function(database,userid,userpw,callback){
    console.log('loginUser 호출');

    UserModel.find({userid:userid,userpw:userpw},(err,result)=>{
        if(!err){
            if(result.length > 0){
                console.log('일치하는 사용자를 찾음');
                callback(null,result);
            }else{
                console.log('일치하는 사용자를 찾을수 없음');
                callback(null,null);
            }
            return;
        }
        callback(err,null);
    });
}


app.use('/',router);

app.listen(port, ()=> {
    console.log(`${port}번 포트로 서버실행중...`);
    connentDB(); //데이터베이스 연결함수 호출
})