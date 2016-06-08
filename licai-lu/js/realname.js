//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency','validMethod','index','cookie','common'], function (){
	var real={
		realname:{
			url:urlStr+'/user'
		},
		namerule:'不能为空',
		idcard:'您输入的身份证号码有误',
		P:function(){
			$('.idcard').bind('blur',function(){
				if($(this).val() == ''){
					$('#idcard-error').html(real.namerule)
				}else if(!idcard($(this).val())){
					$('#idcard-error').html(real.idcard)
				}else{
					$('#idcard-error').html('ok')
				}
			});
			$(document).on('blur','.name',function(){
				if($(this).val() == ''){
					$('#name-error').html(real.namerule)
				}else{
					$('#name-error').html('ok')
				}
			})
		}
	}
	real.P()

    $('#re_start').click(function(){
		if($('#name-error').html() == 'ok'|| $('#idcard-error').html() =='ok'){
			$.cookie('name',$('.name').val(),{path:'/'}) ;
			$.cookie('idcard',$('.idcard').val(),{path:'/'});
		}
    })
});