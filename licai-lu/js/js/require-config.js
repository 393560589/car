require.config({
    paths:{
        'jquery':'../js/module/jquery/jquery.min',
        'layer':'../module/layer/layer',
        'currency':'../currency',
        'zclip':'../module/zclip/jquery.zclip',
        'validata':'../module/validata/jquery.validate.min',
        'validMethod':'../js/module/validata/validMethod',
        /*'layer':'module/layer/layer',*/
        'WdatePicker':'../js/module/DatePicker/WdatePicker',
        'layercss': '../js/module/layer/skin/layer.css',				//异步请求layer插件需要的layer.css文件
        'common':'../js/module/common/common',
        'md':'../js/module/common/md5',
        'session':'../js/module/common/session',
        'cookie':'../js/module/cookie/cookie',
        'koala':'../js/module/slider/koala.min.1.5',
        'terminator':'../js/module/slider/terminator2.2.min',
        'jquery1.8':'../js/module/slider/jquery-1.8.3.min'
    },
    map: {
        '*': {
            'cssjs': '../module/requirejs/css',
        }
    },
    shim:{
        'cookie':{
            deps:['jquery'],
            exports:'cookie'
        },
        'layer':{
            deps:['jquery'],
            exports:'layer'
        },
        'currency':{
            deps:['jquery'],
            exports:'currency'
        },
        'zclip':{
            deps:['jquery'],
            exports:'zclip'
        },
        'WdatePicker':{
            deps:['jquery'],
            exports:'WdatePicker'
        },
        'md':{
            deps:['jquery'],
            exports:'md'
        },
        'session':{
            deps:['jquery'],
            exports:'session'
        }
    }
});







