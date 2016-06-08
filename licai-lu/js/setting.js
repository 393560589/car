//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency','cookie','index','common'], function (){
    //账户设置ajax状态判断
    /*
        "realname":0/1,                       //实名认证  0:未实名   1:已实名
        "tranpwd":0/1,                        //交易密码  0:未设置   1:已设置
        "readdress":0/1                       //收货地址  0:已有地址 1:添加地址
    */
    $.ajax({ 
        url:"../js/json/setting.json",
        dataType:"json",
        type:"get",
        success:function(data){     
            //实名认证    
            if(data.realname == 0){
            	$('.name_no .name_btn').show();
                $('.name_ok').hide();
            }else if(data.realname == 1){
            	$('.name_ok').show().addClass('authok');
                $('.name_no .name_btn').hide();
            };
            //交易密码
            if(data.tranpwd == 0){
                $('.tranpwd_ok').hide();
                $('.tranpwdbtn').html('设置交易密码');
            }else if(data.tranpwd == 1){
                $('.tranpwd_ok').show().addClass('authok');
                $('.tranpwd_no').hide();
                $('.tranpwdbtn').html('修改交易密码').attr('href','http://www.baidu.com');
            };
            //收货地址
            if(data.readdress == 0){
                $('.address_have').hide();
                $('.address_add').html('管理地址地址').attr('href','address.html');
            }else if(data.readdress == 1){
                $('.address_have').show();
                $('.address_add').html('添加地址').attr('href','http://www.baidu.com');
            }
        }
    });
});