$(function(){
    var current = 0; 
    var nextId = 0;
    var setIntervalId;
   
   $('.btns > li').click(function(){
       var i = $(this).index();
       $(this).addClass('act')
       move(i);
   });   
 
   $('#main_img').hover(
       function(){
               clearInterval(setIntervalId)
       },
       function(){
           timer()
       }
   )            

    timer()
   function timer(){
       //setInterval(실행문, 시간)
       //clearInterval
     setIntervalId = setInterval(function(){
       nextId = nextId + 1; //1 ,2 ,3 ==> 0
       if(nextId == 3){
           nextId = 0;
       }
       move(nextId);
       console.log(nextId);
       },3000);
   }
   

  
   function move(nextId){
       
       var currentEl= $('#main_img > ul > li').eq(current);
       var nextEl= $('#main_img > ul > li').eq(nextId);
       currentEl.css({left:'0px'}).animate({left:'-100%'});
       nextEl.css({left:'100%'}).animate({left:'0%'});
     
       current = nextId;
   }

   });