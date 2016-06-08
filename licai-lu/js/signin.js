//通过主模块，运用AMD规范定义的的require()函数调用其他模块。
require(['jquery','currency','validata','index','cookie','common'], function (){
    var signin = {
        phone: $.cookie('gsphone')
    }
    function misk(a,b){
        if($(a).val() == ''){
            $(b).html(rules.error1);
        }else if($(a).val().length<6){
            $(b).html(rules.error4);
        }else{
            $(b).html('');
        }
    }
    $(document).on('blur','.oldpwd',function(){
        misk('.oldpwd',pwderror)
    });
    $(document).on('blur','.newpwd',function(){
        misk('.newpwd',newpwderror)
    })
    $(document).on('blur','.newpwd_two',function(){
        if($(this).val() != $('.newpwd').val()){
            $('#new2error').html(rules.error5);
            $(this).val('')
        }else{
            $('#new2error').html('');
        }
    })
    $('#keep').click(function(){

    });

});