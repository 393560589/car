/**
 * Created by gongchuangshidai on 16/5/26.
 */
//通过主模块，运用AMD规范定义的的require()函数调用其他模块。这里分别是(jquery.js)、、、等子模块。
    require(['jquery','cookie','common'],function(){
        var virt={
            id: $.cookie('id'),
            token: $.cookie('token')
        }

        var setting={
            url:urlStr+'/user/'+virt.id,
            type:'get',
            success:function(data){
                if(data.code == 0 ){
                    leftdata(cashgift,'b',data.packetcount);
                    leftdata(contacts,'b',data.friendsprofit);
                    /*leftdata(interfralmall,'b',data.score);*/
                    leftdata(mybankcard,'b',data.bankcount);
                    leftdata(invitation,'b',data.contacts);
                    leftdata('.per_money','b',' &nbsp;'+data.available_amount);
                    leftdata('.all_money','b',data.total_amount);
                    leftdata('.ass_money','b',data.block_amount);
                    $('.myscore').html(data.score)

                    /*以上公共部分,以下分别判断页面*/
                    if (p == '/account.html'){
                        var defult ='' +
                            '<div class="account-image"><img src="../image/account-image.png" width="100" height="100" alt=""/></div> ' +
                            '<div class="account-information"> ' +
                            '<p class="num_tlt"><span>您好，'+data.phone+'</span><span> &nbsp;<img src="../image/icon1.png" width="18" height="14" alt=""/></span></p> ' +
                            '<p>安全等级:<span style="color:#ee4e42">'+data.security_level+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;您有<span style="color:#ee4e42"> '+data.fee+' </span>条未读消息</p> ' +
                            '<p>上次登录:<span>'+data.last_login+'  '+data.address+'</span></p> ' +
                            '</div>'
                        $('.profit_number').html(defult);

                        $('.zr').html(data.yesterday.total);
                        $('.lj').html(data.profit);
                        $('.total').html(data.amount)
                    };
                    if(p=='/bankwrite.html'){
                        leftdata('.wr_input_txt span:first','strong',data.realname);
                        leftdata('.wr_input_txt span:last','strong',data.idc)
                    }//银行卡添加
                    if(p=='/redeem.html'){
                        leftdata('.re_can','span',data.current)
                    }//赎回时息通
                    if(p=='/withdrawals.html'){
                        $('.can_t .draw_number').html(data.available_amount);
                        $('.can_s .draw_number').html(data.current);

                        $('.drawinput').bind('input propertychange',function(){
                            var that = parseInt($(this).val()),
                                pindage = $('#poundage')
                            if(that<100){
                                pindage.html('1')
                            }else if(parseInt(data.amount)>100){
                                pindage.html('0')
                            }else if(parseInt(data.amount)<100||that>100){
                                pindage.html(
                                    that*0.003
                                )
                            }})//监听输入框事件判断收多少手续费
                    }//提现
                    if(p=='/setting.html'){
                        $('#myphone').html(data.phone);
                        $('#mynick').html(data.nickname);
                        $('.address_have').html(data.address);
                        if(data.pay_pwd == 1){$('.tranpwd_no').html('已设置')};
                        if(data.idc !=''){$('.chackname').html('已认证');$('.name_btn').removeAttr('href')}
                    }//账户设置
                }
            },
            headers:{
                'Authorization':'Basic '+btoa(virt.id+':'+virt.token),
                'Accept':'application/json, text/plain, */*'
            },
            error:function(){}
        },
            fun = {
                actvivty:{
                    url:urlStr+'/activity',
                    type:'get',
                    success:function(data){
                        if(data.code == 0){
                            leftdata(activity,'b',data.list.length)
                        }
                    },
                    error:function(){}
                }
            }
        if(p !='/activity.html'){
            $.ajax(fun.actvivty)
        }

        $.ajax(setting)//请求到数据;
        function leftdata(index,b,num){
            $(index).find(b).html(num);
        }

//登陆测试
        /*$.ajax({
            url:urlStr+'/login',
            type:'post',
            data:{
                phone:'13291821957',
                pwd:'qq88513277'
            },
            success:function(data){
                $.cookie('id',data.token_id,{path:'/',expires:7});
                $.cookie('token',data.token,{path:'/',expires:7});
                $.cookie('gsphone',data.phones,{path:'/',expires:7})
            },
            error:function(){}
        })*/
    })


