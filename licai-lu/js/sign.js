/**
 * Created by gongchuangshidai on 16/6/6.
 */
require(['jquery','common','cookie','md','session'],function($){
    var sign={};
    sign.ok='ok!'
    $('.acc').find('input').bind('blur',function(){
        if($(this).val().length==11){
            sign.data = $(this).val();
            sign.test={
                url:urlStr+'/isregister?phone='+sign.data,
                type:'get',
                success:function(data){
                    if(data.code != 0){
                        $('.acc b').html(rules.phone2);
                    }else{
                        $('.acc b').html(sign.ok);
                    }
                },
                error:function(){}
            }
            if(!isPhone($(this).val())){
               $(this).next().html(rules.phone1);
            }else{
                $.ajax(sign.test);
            }
        }
        return sign.phone = $(this).val();
    })//账户
    $('.pwd').find('input').bind('blur',function(){
        var re =/^[a-zA-Z0-9]{5,21}$/;
        if(!re.test($(this).val())){
            $(this).next().html(rules.pwd1);
        }else if($(this).val().length<6){
            $(this).next().html(rules.error4);
        }else{
            $(this).next().html(sign.ok);
        }
        return sign.pwd = $(this).val();
    })//密码
    $('.checkpwd').find('input').bind('blur',function(){
        if($(this).val() != sign.pwd){
            $(this).next().html(rules.error3)
        }else{
            $(this).next().html(sign.ok);
        }
    })//再次输入密码
    $('.pic .getpic img').bind('click',function(){
        sign.pic='https://licai.gongshidai.com/verfiyimg?w=770&h=252&l=4&sz=110';
        $(this).attr('src',sign.pic);

    })//图形验证码
    $('.sign_now').bind('click',function(){
        if($('.acc b').html() == sign.ok && $('.pwd b').html()==sign.ok&& $('.checkpwd b').html() ==sign.ok){
            sign.code={
                url:urlStr+'/code',
                type:'post',
                data:{
                    type:'reg',
                    phone:sign.phone
                },
                success:function(data){
                    if(data.code == 0){
                        sendCode(getCode);
                    }
                },
                error:function(){}
            };//code==0
            $.ajax(sign.code);

            $('.title li').eq(0).removeClass('check')
            $('.title li').eq(1).addClass('check');
            $('.form-panel').addClass('J_hide').next().removeClass('J_hide');
            $('.forcode b').html(sign.phone);
            $('#getcode').bind('click',function(){
                $.ajax(sign.code)
            })
        }
    })//验证码
    function auto(val){
        var p =val,
            a='ThinkPHP.CN';
        var ap = $.md5(a).substr(5,8);
        var pp = $.md5(p).substr(8,10);
        $.md5(ap+pp);
    }//图形验证码加密

    $('.pic').find('input').bind('input propertychange',function(){
        if($(this).val().length == 4){
            $.session.get((auto($(this).val())+ $.cookie('PHPSESSID')))
        }
    })//图形验证码 等上线才能继续测试
    $('#submit').bind('click',function(){
        sign.submit={
            url:urlStr+'/user',
            type:'post',
            data:{
                phone:sign.phone,
                pwd:sign.pwd,
                code:$('.test').find('input').val()
            },
            success:function(data){
                if(data.code!=0){
                    alert(data.msg);
                }else{
                    $('.forcode').addClass('J_hide').next().removeClass('J_hide');
                    $('.title li').eq(1).removeClass('check')
                    $('.title li').eq(2).addClass('check');
                }
            },
            error:function(){}
        };
        $.ajax(sign.submit)
    })//注册
})