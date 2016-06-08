//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency','WdatePicker'], function (){
	//投资类型分类
    var $record=$('.re_class a');
    $record.click(function(){
      $(this).addClass('re_click').siblings().removeClass('re_click');
      var index=$record.index(this);
      $('.record_content>div').eq(index).show().siblings().hide();      
    });

    //判断有记录和无记录两种状态(data:0/1  0:有数据  1:无数据)
    $.ajax({ 
        url:"../js/json/record.json",
        dataType:"json",
        type:"get",
        success:function(data){        
            if(data.data == 0){
            	$('.havedata').show();
                $('.nodata').hide();
            }else if(data.data == 1){
            	$('.nodata').show();
                $('.havedata').hide();
            };
        }
    });

});
