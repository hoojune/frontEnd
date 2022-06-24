const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;// npm i mongodb

const app = express();
const router = express.Router();

const port = 3000;
app.use(bodyParser.urlencoded({extended: false}));

let database;// 몽고디비 연결 객체

//mongodb연결함수
function connentDB(){
    const databaseURL = "mongodb://localhost:27017";//몽고디비 프로토콜
    MongoClient.connect(databaseURL,(err,db)=>{
        if(!err){
            // const tempdb = db.db(데이터베이스명); 
            const tempdb = db.db('frontenddb');
            database = tempdb;
            console.log('mongodb 데이터베이스 연결 성공!');
        }else{
          console.log(err);      
        }
    })
}

// 회원가입
// http://localhost:3000/member/regist (post)
router.route('/member/regist').post((req,res)=>{
    console.log('/member/regist 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const age = req.body.age;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name}, age:${age}`);
    //post 방식으로 입력된 내용 확인

    if(database){//데이터베이스 연결여부 확인
        joinMember(database,userid, userpw, name, age,(err,result)=>{//콜백함수로 예외처리를 나누어서 처리
            if(!err){//회원가입실행함수연결여부 확인
                if(result.insertedCount > 0){
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.write('<p>가입이 성공적으로 완료되었습니다.</p>');
                    res.end();   
                }
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>오류발생.</p>');
                res.end(); 
            }
        })
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
})

//로그인
// http://localhost:3000/member/login (post)
router.route('/member/login').post((req, res) => {
    console.log('/member/login 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid}, userpw:${userpw}`);
    
    if(database){//db연결여부확인
        loginMember(database, userid, userpw,(err,result)=>{
            if(!err){ //로그인 여부확인
                if(result){//로그인 성공
                  console.dir(result);// 로그인된 정보를 디비에서 갖고옴

                  //toArray()를 사용했기 때문에 ->반복문
                  const resultUseid = result[0].userid;
                  const resultUsepw = result[0].useripw;
                  const resultName = result[0].username;
                  const resultAge = result[0].age;

                  res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                  res.write('<h2>로그인 성공</h2>');
                  res.write(`<p>${resultUseid}(${resultName})님 환영합니다</p>`);
                  res.write(`<p>나이 : ${resultAge}살</p>`);
                  res.end(); 
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p> 로그인 실패했습니다</p>');
                    res.end();  
                }
                
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>서버오류 발생! 로그인 실패했습니다</p>');
                res.end(); 
            }
        })

    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
});


//정보수정
// http://localhost:3000/member/edit (post)
router.route('/member/edit').post((req,res)=>{ //서버에 요청,응답
    console.log('/member/edit 호출!');//연결확인
    //입력값을 상수에 저장
    const userid = req.body.userid; // -> post요청이 아니라면 쿼리문으로 변형
    const userpw = req.body.userpw;
    const name = req.body.name;
    const age = req.body.age;

    //수정하려면 userid는 같아야한다. 밑의 예외처리조건
   console.log(`userid:${userid}, userpw:${userpw}, name:${name}, age:${age}`);
   //서버에서 조회후 수정해줘야한다.
   if(database){  //파라미터 , 로컬은 매개변수
       editMember(database,userid,userpw,name,age,(err,result)=>{ 
           if(!err){
               //서버오류없이 수정시
              if(result.modifiedCount > 0){//카운트가 발생해야 수정성공한것
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 수정 성공</h2>');
                res.write('<p>회원정보 수정에 성공했습니다.</p>');
                res.end();
              }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>정보 수정에 실패했습니다.</p>');
                res.end();
              }

           }else{//서버오류
            res.writeHead('200', {'content-type':'text/html;charset=utf8'});
            res.write('<h2>회원정보 수정 실패</h2>');
            res.write('<p>서버에 오류 발생! 정보수정에 실패했습니다</p>');
            res.end(); 
           }

       })
   }else{
    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
    res.write('<h2>데이터베이스 연결 실패</h2>');
    res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
    res.end(); 
   }
})



//회원삭제
// http://localhost:3000/member/delete (post)
router.route('/member/delete').post((req,res)=>{
    console.log('/member/delete 호출!');

    const userid = req.body.userid;

    console.log(`userid:${userid}`);

    if(database){//밑의 예외처리에서 입력userid의 컬럼을 지우는 조건이 있다.
        deleteMember(database,userid,(err,result)=>{
            if(!err){//서버에 접속되었다면
                if(result.deletedCount > 0){//카운트되었다면 제거성공
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>데이터베이스 삭제 성공</h2>');
                    res.write('<p>회원정보 삭제 성공했습니다</p>');
                    res.end(); 
                }else{//제거할것이 없음
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>데이터베이스 삭제 실패</h2>');
                    res.write('<p>회원정보 삭제 실패했습니다</p>');
                    res.end(); 
                }
            }else{//서버오류
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>데이터베이스 삭제 실패</h2>');
                res.write('<p>서버오류,,,회원정보 삭제 실패했습니다</p>');
                res.end(); 
            }
        })     

    }else{//db연결오류
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();   
    }
})


//--------------------------------------------------------------------------------
//회원가입 함수
const joinMember = function(database, userid, userpw, name, age, callback){
    console.log('joinMember 호출!');
    const members= database.collection('member');//컬렉션을 객체로 가져옴
    //members.insertMany()컬렉션을 저장
    members.insertMany([{userid:userid,userpw:userpw, username:name,age:age}],(err,result)=>{
        if(!err){//인설트에 에러가 발생하지않는다면
            if(result.insertedCount > 0){
                console.log(`사용자 document ${result.insertedCount}명 추가 되었음!`);
            }else{
                console.log(`사용자 document 추가되지 않음!`);
            }
            callback(null,result);
            return;
        }else{
            console.log(err);
            callback(err,null)
        }
    });
}

//로그인 함수
const loginMember = function(database, userid, userpw, callback){
    console.log('loginMember 호출!');
    const members = database.collection('member');
    members.find({userid:userid,userpw:userpw}).toArray((err, result)=>{
         //find()는 여러개의 객체를 찾을수 있기 때문에 배경로 toArray()를 사용함
        if(!err){
             if(result.length > 0){
                console.log('사용자를 찾았습니다.');
                callback(null, result);
             }else{
                console.log('일치하는 사용자가 없습니다.');
                callback(null, null); 
             }
             return;
        }else{
            console.log(err);
            callback(err, null);  
        }
    })
}

//회원정보수정 
const editMember = function(database,userid,userpw,name,age,callback){
    console.log('editMember 호출!');
    const members = database.collection('member');//콜랙션을 객체에 넣어줌
    // 해당 userid와 동일한 userid의 컬럼을 업데이트시킴 -> 즉 userid는 변경안함!!
    members.updateOne({userid:userid},{$set:{userid:userid,userpw:userpw,username:name,age:age}},(err,result)=>{
        //업데이트에 대한 예외처리
        if(!err){
            //수정프로퍼티가 0개이상 : 수정이 됨
            if(result.modifiedCount > 0){//modifiedCount : 포로퍼티 수정한 갯수
                console.log(`사용자 document ${result.modifiedCount}명 수정됨`);
            }else{
                console.log('수정된 document 없음');
            }
            //err발생하지 않고, 결과를 리턴해줌
            callback(null, result);
            return;
        }else{//에러시
            console.log(err);
            callback(err, null); //오류발생
        }
    })
}


//회원삭제
const deleteMember = function(database,userid,callback){
    console.log('deleteMember 호출!');
    const members = database.collection('member');
    //해당 입력된 userid의 컬럼을 지운다.
    members.deleteOne({userid:userid},(err,result)=>{//err는 그냥 err확인용 변수
        if(!err){
            if(result.deletedCount > 0){//삭제된것이 하나라도 있다면
                console.log(`사용자 document ${result.deletedCount}명 삭제됨`);
            }else{
                console.log('삭제된 document 없음');
            };//에러없음
            callback(null,result)
            return;
        }else{
            console.log(err);
            callback(err,null)
        }
    })
}


app.use("/", router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중...`);
    connentDB();
});