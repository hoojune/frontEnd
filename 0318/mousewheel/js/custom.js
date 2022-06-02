$(document).ready(function () {

    var ht = $(window).height();
    $('section').height(ht);
   
    //화면높이 맞춰놓음
    $(window).on('resize', function () {
        var ht = $(window).height();
        $('section').height(ht);
    });
    
   //매개변서event ,delta
    $('section').on('mousewheel', function (event, delta) {
        if (delta > 0) { //0보다 크면 밑으로 내려감
            var prev = $(this).prev().offset().top;
            $('html, body').stop().animate({ 'scrollTop': prev }, 1000, 'easeOutExpo');
        } else if (delta < 0) {//0보다 작으면 
            var next = $(this).next().offset().top;
            $('html, body').stop().animate({ 'scrollTop': next }, 1000, 'easeOutExpo');
        }
    });

});

