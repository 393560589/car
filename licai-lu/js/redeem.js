//通过主模块，运用AMD规范定义的的require()函数调用其他模块。这里分别是(jquery.js)、、、等子模块。
require(['jquery','currency','cookie','index','common'], function (){
    //require()函数接受两个参数。
    //第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；
    //第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。
    //加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

    /*赎回时息通份额*/
    $('#show').show();
    $('#hide').hide()
    var redeem = {
        id: $.cookie('id'),
        token: $.cookie('token')
    }
    $('#re_btn').bind('click',function(){
        redeem.pwd = $('#pay_pwd').val();
        redeem.amount = $('.share').val();
        redeem = {
            em:{
                url:urlStr+'/redeem',
                type:'post',
                data:{
                    amount:redeem.amount,
                    pay_pwd:redeem.pwd
                },
                success:function(data){
                    console.log(redeem.pwd)
                    if(data.code == 0){
                        $('#show').hide();
                        $('#hide').show();
                        $.ajax(redeem.G)
                    }else{
                        alert(data.msg)
                    }
                },
                headers:{
                    'Authorization':'Basic '+btoa(redeem.id+':'+redeem.token),
                    'Accept':'application/json, text/plain, */*'
                },
                error:function(){}
            },
            G:{
                url:urlStr+'/user/'+redeem.id,
                type:'get',
                success:function(data){
                        if(data.code==0){
                            $('.reok_txt p').eq(1).find('span').html(data.available_amount);
                            $('.reok_txt p').eq(2).find('span').html(data.current);

                        }
                },
                headers:{
                    'Authorization':'Basic '+btoa(redeem.id+':'+redeem.token),
                    'Accept':'application/json, text/plain, */*'
                },
                error:function(){}
            }
        }
        $.ajax(redeem.em);
    })
    $('.yournickname').bind('click',function(){
        redeem.nickname = $('#mynick').val();
        if(redeem.nickname ==''){
            return $('#mynick').attr('placeholder','不能为空')
        }
        $.ajax({
            url:urlStr+'/user',
            type:'put',
            data:{
                type:'nick',
                nickname:redeem.nickname
            },
            success:function(data){
                if(data.code == 0){
                    console.log(redeem.nickname)
                    $('.profit').eq(0).removeClass('show').addClass('hide');
                    $('.profit').eq(1).removeClass('hide').addClass('show');
                    $('.nick_txt').find('p').html('您好,'+redeem.nickname)
                }
            },
            headers:{
                'Authorization':'Basic '+btoa(redeem.id+':'+redeem.token),
                'Accept':'application/json, text/plain, */*'
            },
            error:function(){}
        })

    })
});