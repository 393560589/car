/**
 * Created by gongchuangshidai on 16/3/9.
 */
/*网页缩放比例*/
var  urlStr = 'http://licai.gongshidai.com:88/v4_1',
    ur='http://localhost:63342/lcwap-ng/licai/webhtml/',
    rules={
        error1:'不能为空',
        error2:'格式错误请重新输入',
        error3:'两次输入不一致,请重新输入',
        error4:'密码长度在6~20位之间',
        error5:'两次输入不一致,请重新输入',
        phone1:'您输入的手机号码格式不对',
        phone2:'您输入的账户已经注册',
        pwd1:'密码中不能含有特殊字符'
    }
/*数字方法每三加逗号*/
    /*取url中的值*/
    function getParames(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    /*手机号码正则*/
    function isPhone(phone){
        var rules = /^1[3|4|5|7|8][0-9]{9}$/;
        return rules.test(phone)
    }
    /*判断是否微信*/
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    /*判断手机类型*/
    function isPhoneType() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            return 'android';
        } else if (u.indexOf('iPhone') > -1) {
            return 'iphone';
        } else if (u.indexOf('Windows Phone') > -1) {
            return 'winphone';
        }
    }
    /*正整数正则*/
    var re = /^[1-9]+[0-9]*]*$/;
    /*将输入值写成一个事件changeColor*/
    function changeColor(a,b,c){
        $(a).bind('input propertychange', function() {
            if($(this).val().length>6){
                $(b).css('backgroundColor',"#ee4e42").attr('href',c)
            }else{
                $(b).css('backgroundColor',"#d6d6d6").removeAttr('href')
            }
        });
    }
    /*中间空四位的方法*/
    /*function space(index){
        $(index).keyup(function(){
            this.value =this.value.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
        })
    }*/
    /*space('input[type=tel]')*/
    /*身份证验证方法*/
    function idcard(code) {
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;

        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }

        else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                tip = "校验位错误";
                if(parity[sum % 11] != code[17]){
                    pass =false;
                }
            }
        }
        return pass
    }
    /*验证码倒计时*/
    var clock = '';
    var nums = 60;
    var btn;
    var getCode = document.getElementById("getcode")
    function sendCode(thisBtn)
    {
        btn = thisBtn;
        btn.disabled = true; //将按钮置为不可点击
        btn.value = nums+'秒';
        clock = setInterval(doLoop, 1000); //一秒执行一次
    }
    function doLoop()
    {
        nums--;
        if(nums > 0){
            btn.value = nums+'s';
        }else{
            clearInterval(clock); //清除js定时器
            btn.disabled = false;
            btn.value = '重新发送';
            nums = 10; //重置时间
        }
    }
    function moneyNum(str){
        var newStr = "";
        var count = 0;

        if(str.indexOf(".")==-1){
            for(var i=str.length-1;i>=0;i--){
                if(count % 3 == 0 && count != 0){
                    newStr = str.charAt(i) + "," + newStr;
                }else{
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr + ".00"; //自动补小数点后两位
            return str
        }
        else
        {
            for(var i = str.indexOf(".")-1;i>=0;i--){
                if(count % 3 == 0 && count != 0){
                    newStr = str.charAt(i) + "," + newStr;
                }else{
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
            return str
        }
    }

//银行卡
    function luhmCheck(bankno){
        var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

        var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array();  //奇数位*2的积 <9
        var arrJiShu2=new Array(); //奇数位*2的积 >9

        var arrOuShu=new Array();  //偶数位数组
        for(var j=0;j<newArr.length;j++){
            if((j+1)%2==1){//奇数位
                if(parseInt(newArr[j])*2<9)
                    arrJiShu.push(parseInt(newArr[j])*2);
                else
                    arrJiShu2.push(parseInt(newArr[j])*2);
            }
            else //偶数位
                arrOuShu.push(newArr[j]);
        }

        var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
        for(var h=0;h<arrJiShu2.length;h++){
            jishu_child1.push(parseInt(arrJiShu2[h])%10);
            jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }

        var sumJiShu=0; //奇数位*2 < 9 的数组之和
        var sumOuShu=0; //偶数位数组之和
        var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
            sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }

        for(var n=0;n<arrOuShu.length;n++){
            sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }

        for(var p=0;p<jishu_child1.length;p++){
            sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
            sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

        //计算Luhm值
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
        var luhm= 10-k;

        if(lastNum==luhm){
            return true;
        }
        else{
            return false;
        }
    }
//
    var str = window.location.href,
        p=str.substring(str.lastIndexOf("/"));