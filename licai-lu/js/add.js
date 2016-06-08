//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','layer','validata','currency','cssjs!layercss'], function (){

$('#add_form').validate({
        rules: {
          name:{
              required: true,
              remote:{
                type:"POST",
                  url:"",
                  data:{
                    txpassword:function(){return $(".realname").val();}
                  }
              }
          },
          phone:{
              required: true,
              remote:{
                type:"POST",
                  url:"",
                  data:{
                    txpassword:function(){return $(".phonenumber").val();}
                  }
              }
          },
          address:{
            required: true,
              remote:{
                type:"POST",
                  url:"",
                  data:{
                    txpassword:function(){return $(".addresstxt").val();}
              }
            }
          }
      },
      messages: {
          name:{
              required:'姓名不能为空',
              remote:'姓名不存在'
          },
          phone:{
              required: '手机号码不能为空',
              remote:'登录密码错误'
          },
          address:{
              required: '收件地址不能为空'
          }
      },
      errorPlacement:function(error,element) {  
        error.appendTo(element.next(".errortxt"));
      }

    });

    $('#add_keep').click(function() {
      $('#add_form').submit();
    });

});