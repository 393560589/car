//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','layer','currency','cssjs!layercss'], function (){
    /*反馈意见或建议*/
    if($('#proposal')){
      $('#proposal').click(function(){
          layer.open({
            type: 1,
            title:false,
            skin: 'pro_txt', //样式类名
            closeBtn: 0, //不显示关闭按钮
            area:['620px','300px'],
            shadeClose: true, //开启遮罩关闭
            content: '<div class="pro"><p class="pro_head">请描述您的意见或建议</p><div class="pro_area"><textarea placeholder="请输入200字以内信息"></textarea></div><a id="pro_yes" href="javascript:">提交</a></div>'
          });
      });
    };

    //账户设置提醒开关
    $('.switch a').click(function(){
      if($(this).attr('value') == 0){
        $(this).css('background-position','-5px -69px').attr('value','1');
      }else if($(this).attr('value') == 1){
        $(this).css('background-position','-5px -8px').attr('value','0');
      }      
    });
});