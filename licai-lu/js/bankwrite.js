//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency','validata','cookie','common','index'], function (){
    //添加银行卡页面，银行卡号输入框监听事件
    $('.newbankwrite').bind('input propertychange', function() {
        var txtlength=$(this).val(),
            bank = {
                url:urlStr+'bankcard',
                type:'post',
                data:{
                    number:txtlength,

                }
            }
        /*alert(txtlength);*/

        if(luhmCheck(txtlength) == true){
            alert('hehe')
        }
        if(txtlength.length == 16){
            $('#binding').addClass('writing');
            $('.newbankbox').show().append(txtlength);
        }else{
            $('#binding').removeClass('writing');
            $('.newbankbox').hide().html('');
        }        
    });
    //银行卡号输入框失去焦点事件
    $('.newbankwrite').blur(function(){
        $('.newbankbox').hide().html('');
    })
    //银行卡号输入框获取焦点事件
    $('.newbankwrite').focus(function(){
        var txtlength=$(this).val();
        if(txtlength.length == 16){
            $('.newbankbox').show().append(txtlength);
        }else{
            
        }
    });
    $('.binding').bind('click',function(){
        var data = {
            bank:$('.newbankwrite').val()
        }
    })
});