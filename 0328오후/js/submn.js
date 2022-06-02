$(document).ready(function(){
    $('.sub_mn').hide();
    $('.main_mn > li').hover(
        function(){
            $(this).find('.sub_mn').show();
            $(this).children("a").addClass('on');
           },
        function(){
           $('.sub_mn').hide();
           $(this).children("a").removeClass('on')
        }
    )

    $('.sub_mn > li').on({
       mouseover:function(){
        $(this).find('a').addClass('on2')
       },
       mouseout:function(){
         $(this).find('a').removeClass('on2')
       },

    })
    

});