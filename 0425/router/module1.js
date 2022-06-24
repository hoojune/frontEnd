module.exports = (app, fs) => {

    // http://localhost:3000
    app.get('/', (req, res) => {
        res.render('index.ejs', {
            length: 10
        });
    });

    // http://localhost:3000/about
    app.get('/about', (req, res) => {
        res.render('about.html');
    });

    // http://localhost:3000/list
    app.get('/list', (req, res) => {
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(!err){
                console.log(data);
                res.writeHead(200, {'content-type':'text/json;charset=utf-8'});
                res.end(data);
            }else{
                console.log(err);
            }
        })
    });

    // http://localhost:3000/getMember/apple  /apple항상바뀔수 있는 변수
    app.get('/getMember/:userid', (req, res) => {
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(!err){
                const member = JSON.parse(data);//JSON형식으로 불러옴 이렇게 안하면 글자형으로 갖고오기땜문
                res.json(member[req.params.userid]);
            }else{
                console.log(err);
            }
        })
    });

// REST 란?
// "Representational State Transfer"의 약자
// 자원을 이름으로 구분하여 해당 자원의 상태를 주고 받는 것을 의미합니다.

// CRUD 연산
// CREATE : 생성(POST)
// READ : 조회(GET)
// UPDATE : 수정(PUT)
// DELETE : 삭제(DELETE)

// JSON(JavaScript Object Notation)
// 데이터를 교환하고 저장하기 위해 만들어진 텍스트 기반의 데이터 교환 표준입니다.

// JSON.parse()
// JSON 포맷으로 되어 있는 문자열을 JSON 객체로 변환
// JSON 문자열을 매개변수로서 수용하고, 일치하는 자바스크립트 객체로서 변환
// JSON.parse(String 문자열)

// JSON.stringify()
// JSON 객체를 JSON 포맷의 문자열로 변환
// 객체를 매개변수로서 수용하고, JSON 문자열 형태로 변환합니다.
// JSON.stringify(JSON 객체)

// \n : 줄 바꿈 (Enter)
// \t : 탭 (Tab)
// \ : 백스페이스 등

    //회원가입
    //http://localhost:3000/joinMember/apple1 추가
    app.post('/joinMember/:userid', (req, res) => {
        const result = {}; //실제로 데이터를 입력 요소가 수정되는건 상관없음 
        const userid = req.params.userid;//요청한 아이디 Apple1

        //오류검사: 패스워드, 네임이 입력여부를 확인하고 없을 경우 오류처리를 위한 부분 
        if(!req.body["password"] || !req.body["name"]){//입력칸에 둘다 입력하였는가?
            result["success"] = 100;    // 100 : 실패
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result); 
            return false;//더이상 진행이 안되고 앱 종료
        }

        //아이디중복 검사
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => { 
            const member = JSON.parse(data);//읽어들인 JSON파일을 객체로 변환
            //조건
            if(member[userid]){//member 객체에 아이디가 있는지 검사
                result["success"] = 101;    // 101 : 중복
                result["msg"] = "중복된 아이디";
                res.json(result);
                return false;//더이상 진행이 안되고 앱 종료
            }
            console.log(req.body);//확인

            //중복이 없다면
            member[userid] = req.body;//아이디 전달
            //member.json에 기본값이null인 상테에서 작성('\t')후 저장된다.
            fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t')
            , 'utf8', (err, data) => {
                //JSON.stringify(member, null, '\t')
                //객체를 매개변수로서 수용하고, JSON 문자열 형태로 변환(저장)
                if(!err){ 
                    result["success"] = 200;
                    result["msg"] = "성공";
                    res.json(result);
                }else{
                    console.log(err);
                }
            });
        });
    });
   
 


    //회원수정
    // http://localhost:3000/updateMember/apple1
    app.put('/updateMember/:userid', (req, res) => {
        const result = {};
        const userid = req.params.userid;

        //오류검사: 패스워드, 네임이 입력여부를 확인하고 없을 경우 오류처리를 위한 부분 
        //컬럼추가시 안의 내용이 있는지 없는지
        if(!req.body["password"] || !req.body["name"]){//수정할 내용이 없다면?
            result["success"] = 100;    // 100 : 실패
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result); 
            return false;//더이상 진행이 안되고 앱 종료
        }
        //수정할 내용이 있다면
        //수정하기 위해 json파일을 불러옴
        fs.readFile(__dirname + "/../data/member.json","utf8", (err, data) => {
            if(!err){
                const member = JSON.parse(data);//JSON파일을 불러와 객체로 저장
                member[userid] = req.body;//정보를 전달

                //파일을 불러온상태에서 예외처리
                //json파일 작성 및 저장
                fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'),'utf8',(err, data) => {
                    //fs.writeFile 예외처리
                    if(!err){
                        result["success"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }else{
                        console.log(err);
                    }
                })
            }
        })
    });
    

    // 회원정보 삭제
    // http://localhost:3000/deleteMember/apple
    app.delete('/deleteMember/:userid', (req, res) => {
        let result = {};
        //json파일을 불러온다면 객체로 변환시켜줘야 선택하기 편하다.
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            const member = JSON.parse(data);
            if(!member[req.params.userid]){//아이디가 저장되어 있는지 유무 상태 확인
                result["success"] = 102;
                result["msg"] = "사용자를 찾을 수 없음";
                res.json(result);
                return false;
            }
            //삭제할것이 있다면 
            delete member[req.params.userid]; //삭제할 부분만 데이터를 삭제이후 재저장후
            //json데이터를 다시 쓴후 재저장한 상태로 만들어 줘야한다.
            fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf8', (err, data) => {
                result["success"] = 200;
                result["msg"] = "성공";
                res.json(result);
            })
        })
    });
    

}