//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency','validata'], function (){
    $('#tran_form').validate({
      rules: {
          code:{
            required: true,
            digits:true,
            rangelength:[6,6],
            remote:{
              type:"POST",
              url:"",
              data:{
                idcard:function(){return $(".code").val()}
              }
            }
          },
          name:{
            required: true,
            remote:{
              type:"POST",
              url:"",
              data:{
                name:function(){return $(".name").val();}
              }
            }
          },
          idcard:{
            required: true,
            isIdCardNo:true,
            remote:{
              type:"POST",
              url:"",
              data:{
                name:function(){return $(".idcard").val();}
              }
            }
          }
      },
      messages:{
        code:{
          required:'验证码不能为空',
          digits:'验证码必须是整数',
          rangelength:'请输入6位字符长度的正确验证码',
          remote:'验证码错误'
        },
        name:{
          required: '姓名不能为空',
          remote:'姓名不存在'
        },
        idcard:{
          required: '身份证号码不能为空',
          remote:'身份证号码错误'
        }
      }
    });
    $('#tr_next').click(function(){
      $('#tran_form').submit();
    });

});