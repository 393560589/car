//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency'], function (){
    //账户设置ajax状态判断
    /*
        "state":0/1,                       //实名认证  0:未实名   1:已实名
    */
    $.ajax({ 
        url:"../js/json/bank.json",
        dataType:"json",
        type:"get",
        success:function(data){     
            if(data.state == 0){
                $('.bankmask').hide();  //未实名无法添加银行卡遮罩层
            }
        }
    });


    /*未实名无法绑定银行卡 遮罩层提示语关闭按钮*/
    $('.maskbox').on('click', 'i', function(event) {
        $('.maskbox').hide();
    });


});