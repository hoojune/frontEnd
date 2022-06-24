//이벤트를 process에 생성한것
process.on('exit', () =>{
    console.log('exit 이벤트가 발생');
});

setTimeout(() => {
    console.log('3초 후 시스템 종료');
    process.exit;
},3000);