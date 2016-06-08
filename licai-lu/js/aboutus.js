/**
 * Created by gongchuangshidai on 16/6/7.
 */
require(['jquery','common'],function($){
    $('.fix-menu ul').find('a').bind('click',function(){
        var a = $(this).attr('data-id');
        $('body,html').animate({scrollTop:$(a).offset().top},500)
        $('.fix-menu ul li').removeClass('active')
        $(this).parent().addClass('active')
    })
})