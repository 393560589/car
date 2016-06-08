//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency','validata'], function (){
    $.ajax({ 
        url:"../js/json/phone.json",
        dataType:"json",
        type:"get",
        success:function(data){         //0:未实名 1:已实名
            if(data.phone === 0){
              $('.phoneone').show();
              $('.phonetwo').hide();
            }else if(data.phone == 1){
              $('.phoneone').hide();
              $('.phonetwo').show();
            }
        }
    });

});
