/**
 * Created by gongchuangshidai on 16/5/30.
 */
require(['jquery','koala','terminator','cookie','common'],function($){
    Qfast.add('widgets', { path: "js/terminator2.2.min.js", type: "js", requires: ['fx'] });
    Qfast(false, 'widgets', function () {
        K.tabs({
            id: 'fsD1',   //焦点图包裹id
            conId: "D1pic1",  //** 大图域包裹id
            tabId:"D1fBt",
            tabTn:"a",
            conCn: '.fcon', //** 大图域配置class
            auto: 1,   //自动播放 1或0
            effect: 'fade',   //效果配置
            eType: 'click', //** 鼠标事件
            pageBt:true,//是否有按钮切换页码
            bns: ['.prev', '.next'],//** 前后按钮配置class
            interval: 10000  //** 停顿时间
        })
    })//banner图片
    var F ={
        rental:{
            url:urlStr+'/rental',
            type:'get',
            success:function(data){
                if(data.code==0){
                    var result = '共有<span>'+moneyNum((data.solid).toString())+'</span>位用户注册,累计收益金额为<span>¥'+moneyNum((data.interest).toString())+'</span>';
                    $('#solid').html(result);
                    var amount = (data.amount).toString(),
                        a=[];
                    for(var i=0;i<amount.length;i++){
                        var b = '<b>'+amount[i]+'</b>';
                        a.push(b);
                        var  re =a[i]
                        $('#amount').append(re)
                    }
                }//总资金总人数
            },
            error:function(){}
        },
        notice:{
            url:urlStr+'/notice',
            type:'get',
            success:function(m){
                for(var i=0;i<7;i++){
                    var news = '<a class="clearfix" href="'+ m.list[i].url+'"><span class="circle">'+(i+1)+'</span><span class="n_title"> '+ m.list[i].title+'</span> <span class="pull-right">'+(m.list[i].add_time).toString().substr(0,10)+'</span></a>';
                    $('.newright ul').append(news)
                }
            },
            error:function(){}
        },
        product:{
            url:urlStr+'/product',
            type:'get',
            success:function(data){
                F.newBird = function(){
                    var news = '<div class="div1 pull-left"> <h3>'+data.name+'<span>新手特权,限投2万</span></h3> ' +
                        '<ul> <li class="licai1"> <h4>12.00 <b>%</b></h4> <span>年化收益</span> </li>' +
                        ' <li class="licai2"> <h4>7<b>天</b></h4> <span>项目期限</span> </li> ' +
                        '<li class="licai3"> <h4>30000<b>元</b></h4> <span>项目总额</span> </li> ' +
                        '<li class="licai4"> <div class="progress"> <span class="blue"></span>' +
                        ' </div> <b>80%</b> </li> <li class="licai5"> <a class="buynow" href="">立即购买</a>' +
                        ' </li> </ul> </div>'
                }//新手专享
            },
            error:function(){}
        }
    }
    $.ajax(F.notice)
    $.ajax(F.rental);
    $.ajax(F.product)
})