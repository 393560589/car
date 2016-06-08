//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency','validata','cookie','index','common'], function (){
    $('#money_form').validate({
      	rules: {
        	drawinput:{
          		required: true,
          		digits:true,
        		min:10
	        },
	        txpassword:{
	          	required: true,
	          	remote:{                                          //验证交易密码是否正确
	          		type:"POST",
               		url:"",
                	data:{
                		txpassword:function(){return $(".tx_password").val();}
               		}
             	}
	        }
	    },
    	messages: {
        	drawinput:{
          		required:'*提现金额不能为空',
         		digits:'*提现金额必须是整数',
          		min:'*提现金额不得少于10元'
        	},
        	txpassword:{
          		required: '*交易密码不能为空',
          		remote:'*交易密码错误'
        	},
      	errorPlacement:function(error,element) {  
      		error.appendTo(element.next(".errorbox"));
   	  	}

    }});

	var bank={};
	bank.idb = $.cookie('id');
	bank.token = $.cookie('token');
		bank={
		em:{
			url:urlStr+'/bank',
			type:'get',
			success:function(data){
				bank.bankid = data.id;
				if(p == '/withthree.html'){
					$('.with_success p').eq(2).find('span').html(data.number)
				}//成功后的传递值
			},
			headers:{
				'Authorization':'Basic '+btoa($.cookie('id')+':'+$.cookie('token')),
				'Accept':'application/json, text/plain, */*'
			},
			error:function(){}
		}
	}
	$.ajax(bank.em);

    $('#next_btn').bind('click',function(){
		bank.amounts = (parseInt($('.drawinput').val())-parseInt($('#poundage').html()));
		bank={
			B:{
				url:urlStr+'/withdraw',
				type:'post',
				data:{
					bank_id:bank.bankid,
					amount:bank.amounts,
					pay_pwd:$('.tx_password').val()
				},
				success:function(data){
					if(data.code == 0){
						window.location.href = 'http://localhost:63342/lcwap-ng/licai-lu/webhtml/withdrawals/withthree.html';

					}else{
						alert(data.msg)
					}
				},
				headers:{
					'Authorization':'Basic '+btoa($.cookie('id')+':'+ $.cookie('token')),
					'Accept':'application/json, text/plain, */*'
				},
				error:function(){}
			}
		}
    	$('#money_form').submit();
		if(parseInt($('.drawinput').val())>10 || $('.tx_password').val()!=''){
			$.ajax(bank.B)
		}else{
			alert('提现金额不得少于10元')
		}
    });

});