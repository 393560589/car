//通过主模块，运用AMD规范定义的的require()函数调用其他模块。这里分别是(jquery.js)、、、等子模块。
require(['jquery','currency','zclip','WdatePicker','cookie','common','index'], function (){
    //require()函数接受两个参数。
    //第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；
    //第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。
    //加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。
    /*有效/无效红包选择*/
    var $regbag=$('.cashbtn a');
    $regbag.click(function(){
      $(this).addClass('font_red').siblings().removeClass('font_red');
      var index=$regbag.index(this);
      $('.cash_box>div').eq(index).show().siblings().hide();      
    });

    /*邀请好友，复制链接*/
    $("#fz_btn").zclip({
      path:'../module/zclip/ZeroClipboard.swf', //记得把ZeroClipboard.swf引入到项目中 
      copy:function(){
        return $('#http_txt').val();
      }
    });
    var virt={
        id: $.cookie('id'),
        token: $.cookie('token')
    }

    var cashgift = {
        url:urlStr+'/luck/'+virt.id,
        type:'get',
        data:{
            type:'use'
        },
        success:function(data){
            if(data.list.length>0){
                var F=[]
                for(var i=0;i<data.list.length;i++){
                    var result='<li><div class="redcon"> ' +
                        '<div class="leftit"> ' +
                        '<p>'+data.list[i].amount+'元</p> ' +
                        '<b>首投红包,固息宝投资满'+data.list[i].min+'元时抵扣</b> ' +
                        '<h4>有效期至'+data.list[i].end_date+'</h4> ' +
                        '</div> ' +
                        '</div></li>';
                    F.push(result)
                    $('.redbag').find('ul').html(F)
                    }
            }

        },
        headers:{
            'Authorization':'Basic '+btoa(virt.id+':'+virt.token),
            'Accept':'application/json, text/plain, */*'
        },
        error:function(data){}
    },
        lostbag={
            url:urlStr+'/luck/'+virt.id,
            type:'get',
            data:{
                type:'used'
            },
            success:function(data){
                if(data.list.length>0){
                    var F=[]
                    for(var i=0;i<data.list.length;i++){
                        var result='<li><div class="redcon"> ' +
                            '<div class="leftit"> ' +
                            '<p>'+data.list[i].amount+'元</p> ' +
                            '<b>首投红包,固息宝投资满'+data.list[i].min+'元时抵扣</b> ' +
                            '<h4>有效期至'+data.list[i].end_date+'</h4> ' +
                            '</div> ' +
                            '</div></li>';
                        F.push(result);
                        $('.invalid_bag').find('ul').html(F)
                    }
                }

            },
            headers:{
                'Authorization':'Basic '+btoa(virt.id+':'+virt.token),
                'Accept':'application/json, text/plain, */*'
            },
            error:function(data){}
        },
        activity = {
            url:urlStr+'/activity',
            type:'get',
            success:function(data){
                $('#activity').find('b').html(data.list.length);
                var G=[];
                for(var i =0;i<data.list.length;i++){
                    var result = ' <div class="acti_box"> ' +
                        '<div class="acti_img"><img src="'+data.list[i].imageurl+'" alt=""></div> ' +
                        '<div class="acti_txt"> ' +
                        '<p class="ac_t_tlt">'+data.list[i].title+'</p> ' +
                        '<p class="ac_t_txt">'+data.list[i].begin_date+'至'+data.list[i].end_date+'</p> ' +
                        '<a class="ac_join_btn" href="'+data.list[i].href+'">立即参与</a> ' +
                        '</div> ' +
                        '</div>';
                    G.push(result);
                    $('.activity').html(G)
                }

            },
            error:function(data){}
        }
    if(p == '/cashgift.html'){
        $.ajax(cashgift)
        $('.font_red').bind('click',function(){
            $.ajax(cashgift)
        })
        $('.lost_bag').bind('click',function(){
            $.ajax(lostbag)
        })
    }
    if(p == '/activity.html'){
        $.ajax(activity)
    }
});