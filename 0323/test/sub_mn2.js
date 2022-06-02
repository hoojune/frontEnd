$(function(){
    $('sub_mn > li').on({
        mouseover:function(){
            $(this).find('a').addClass('on2');
        },
        mouseout:function(){
            $(this).find('a').removeClass('on2');
        }     
    })
})