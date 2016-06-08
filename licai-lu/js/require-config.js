require.config({
	paths:{
		'jquery':'module/jquery/jquery.min',
        'layer':'module/layer/layer',
        'currency':'../js/currency',
        'zclip':'module/zclip/jquery.zclip',
        'validata':'module/validata/jquery.validate.min',
        'validMethod':'module/validata/validMethod',
        'layer':'module/layer/layer',
        'WdatePicker':'module/DatePicker/WdatePicker',
        'layercss': 'module/layer/skin/layer',				//异步请求layer插件需要的layer.css文件
        'common':'module/common/common',
        'cookie':'module/cookie/cookie',
        'index':'module/index/index'
    },
	map: {
        '*': {
            'cssjs': 'module/requirejs/css',
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
        }
    }
});











