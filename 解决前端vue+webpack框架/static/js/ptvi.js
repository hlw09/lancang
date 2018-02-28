
var comTag="JIEJUEH5";

var Scanner = {
    /**
     * 扫码（二维码、条码）
     * @param － params 自定义参数（暂时无用1.0.1）
     * @param callback － 成功返回时执行的函数
     * @param fail － 失败返回时执行的函数
     * @return 扫码后得到的字符串
     * @since 1.0.1
     * @memo REQUEST_CODE_SCANNER = 3928461；相机静候300秒后自动返回，超时扫码无效
     */
    scan: function (params, callback, fail) {
        var json = {
            'params': params
        };
        return exec_asyn("Scanner", "scan", JSON.stringify(json), callback, fail);
    }
};
//html5应用
var App = {

	/**
     * 页面跳转
     * @param type 跳转页面类型
     * @param userID 用户ID （为空表示没登录）
     */
	push : function(type, userID) {
        var json = {
            "type": type,
            "userID": userID
        }

        exec_syn("App", "push", JSON.stringify(json));

    },

    //isPrinter  判断是否有打印机
    isPrinter: function () {
        return false;
    },
    //获取通讯录
    getContacts : function() {
        return exec_syn("App", "getContacts", null);
    },

    //隐藏标题栏图片
    hideTopBarImage: function () {
        exec_syn("App", "hideTopBarImage", "{}");
    },

    //显示html5应用右上角图片
    showTopBarImage: function () {
        exec_syn("App", "showTopBarImage", "{}");
    },
    /**
     * 获取本地图片或调用摄像头
     */
    getImage: function () {
        return exec_syn("App", "getImage", null);
    },
    /**
     * 打开摄像头
     * @param {Object} take_photo_success
     * @param {Object} take_photo_fail
     */
    takePhoto: function (type,take_photo_success, take_photo_fail) {
    	var args ={
    		type:type
    	} ;
        return exec_asyn("App", "takePhoto", JSON.stringify(args), take_photo_success, take_photo_fail);
    },
    /**
     * 打开本地图片
     * @param {Object} pick_picture_success
     * @param {Object} pick_picture_fail
     */
    pickPicture: function (type,pick_picture_success, pick_picture_fail) {
    	var args ={
    		type:type
    	} ;
        return exec_asyn("App", "pickPicture", JSON.stringify(args), pick_picture_success, pick_picture_fail);
    },
    setBitmapSize: function () {
        return exec_syn("App", "setBitmapSize", null);
    },
    getCityCode: function(getCityCodeSucess){
        return exec_asyn("App", "getCityCode",null,function(result){
            result = JSON.parse(result);
            getCityCodeSucess(result);
        },function(){});
    },
    getCity: function(getCitySucess){
        return exec_asyn("App", "getcity",null,function(result){
            result = JSON.parse(result);
            getCitySucess(result);
        },function(){});
    },
    /**
     * 获取本地的地理位置
     */
    getLocinformation:function(getLocinformationSucess){
        // return exec("App","getLocinformation");
        return exec_asyn("App", "getLocinformation",null,function(result){
            result = JSON.parse(result);
            getLocinformationSucess(result);
        },function(){});
    },
    qrcodeScan: function(scanScuccess){
        return exec_asyn("App", "qrcodeScan",null,function(result){
            result = JSON.parse(result);
            scanScuccess(result);
        },function(){});
    },
    /**
     * 隐藏title
     */
    dismissTopbar: function(){
        return exec_syn("App", "dismissTopbar", "{}");
    },
    /**
     * 显示title
     */
    showTopbar: function(){
        exec_syn("App", "showTopbar", "{}");
    },
    /**
     * 显示title
     */
    showBack: function(isShow){

        var json = {
            "isShow": isShow || '0'
        }
        exec_syn("App", "showBack", JSON.stringify(json));
    },
    showTabbBar: function(isShow){
        var json = {
            "isShow": isShow || '0'
        }
        exec_syn("App", "showTabbBar", JSON.stringify(json));
    },
    showHomeClick: function(isSHow){
        var json={
            "isShow":isSHow || '0'
        }
        exec_syn("App", "showHomeBtn", JSON.stringify(json));
    },
    /**
     * 设置右上角图标及事件
     * @param path 跳转页面的绝对路径
     * @param type 图标类型 String billhistory列表
     * 都为空值时则隐藏右上角图标
     */
    setRightBtnBackground: function (path, type) {
        var json = {
            "path": path || '',
            "type": type || ''
        }
        exec_syn("App", "setRightBtnBackground", JSON.stringify(json));
    },

    // 设置html5应用标题内容。html5应用的标题是由android实现。
     setTitle: function (title,preTitle) {
        if (typeof title == "string") {
            App.setTitleOrImage({
                type:"text",
                value:title,
                preTitle:preTitle
            });
            //var json = {
            //    "title": title
            //};
            //exec_syn("App", "setTitle", JSON.stringify(json));
        } else {
            App.setTitleOrImage(title);
        }


    },

    //获取屏幕分辨率
    getScreen: function () {
        return screen.width + "x" + screen.height;

    },
    // 截断返回键事件，用户在按返回键的时候就不会退出html5渲染界面了。
    overrideBackPressed: function (bound) {
        var json = {
            "bound": bound
        }
        exec_asyn("App", "overrideBackPressed", JSON.stringify(json));
    },

    //退出应用，html5渲染界面关闭
    exitApp: function () {
        return exec_syn("App", "exitApp", null);
    },

    /*
     * hardware key listener function onKeyDown(event){ if(event ==
     * "backpress"){//key back //code }else if(event == "menupress"){// key menu
     * //code }else if(event == "searchpress"){// key search //code } }
     */
    // 设置硬键盘监听，当用户按下返回，菜单，搜索按键的时候，onKeyEvent回调函数会被触发。
    // 事件如上 backpress、menupress、searchpress
    setKeyEventListener: function (listener) {
        window.listener = listener;

    },

    // 按键事件监听。如若setKeyEventListener设置了监听器，则当用户按下返回，菜单，搜索按键的时候，此函数会被触发
    // 事件如上 backpress、menupress、searchpress
    onKeyEvent: function (event) {
        if (typeof window.listener == 'function') {
            window.listener(event);
        }
    },
    setTitleBackgroundColor : function(color) {
        var json = {
            "color" : color
        }
        exec_syn("App", "setTitleBackground", JSON.stringify(json));
    },
    setTitleColor : function(color) {
        var json = {
            "color" : color
        }
        exec_syn("App", "setTitleColor", JSON.stringify(json));
    },
    checkLogin : function(loginReturn) {
        var json = {
            "key": "loginInfo",
            "defValue": "",
            "prefname": "JIEJUETAG",
            "loginReturn": loginReturn
        };
        exec_syn("App", "checkLogin", JSON.stringify(json));
    },
    checkLoginWithStatus : function(doSuccess,colseView) {
        var json = {
            "key": "loginInfo",
            "defValue": "",
            "colseView":colseView,
            "prefname": "JIEJUETAG"
        };
        exec_asyn("App", "checkLoginWithStatus", JSON.stringify(json),doSuccess,function(){});
    },
    webviewReaload : function() {
        var json = {
        }
        exec_syn("App", "webviewReaload", null);
    },
    //是否设置了手势密码
    isSetGesturePassword:function(){
        return exec_syn("App","isSetGesturePassword",null);
    },

    //取消手势密码
    cancelGesturePassword:function(){
        return exec_syn("App","cancelGesturePassword",null);
    },

    //进入设置手势密码界面
    toGestureEditActivity:function(){
        return exec_syn("App","toGestureEditActivity",null);
    },
    /**
     * call alipay sdk pay. 调用SDK支付
     * @param productName    商品名称  String
     * @param productDescribe   商品描述   String
     * @param productOrder   商品订单   String
     * @param money  商品价钱    String
     * @param payType  支付产品类型    String
     */
    alipay:function(productName, productDescribe,productOrder, money , payType,alipay_success,alipay_fail){

        var json = {"productName": productName,"productDescribe":productDescribe , "productOrder": productOrder, "money": money,"payType":payType};

        return exec_asyn("App","alipay",JSON.stringify(json),alipay_success,
            function(result){
            }
        );
    },
    /**
     * 微信支付
     * @param body    订单描述，暂为商品名  String
     * @param totalFee   价钱，单位分   String
     * @param orderNo  订单号    String
     * @param payType  支付产品类型    String
     */
    weixinPay:function(body, totalFee, orderNo, payType,weixin_success,weixin_fail){
        var json = {"body":body, "totalFee":totalFee,"orderNo":orderNo , "payType":payType};
        return exec_asyn("App","weixinPay",JSON.stringify(json),weixin_success,function(result){
        });
    },
    /*会员支付
     *
     *
     */

    toFrontPage:function(){
        return exec_syn("App","toFrontPage",null);
    },
    setLoginStatus:function(loginStatus){
        var json = {
            "loginStatus":loginStatus
        }
        var json_str = JSON.stringify(json);
        return exec_syn("App","setLoginStatus",json_str);
    },
    getVersion: function () {
        return exec_syn("App", "getVersion", null);
    },

    /**
     * 获取环境url
     */
    serverBaseUrl: function () {
        return exec_syn("App", "serverBaseUrl",null);
    },
    setTopRightBar:function(args){
        exec_syn("App", "setTopRightBar",JSON.stringify(args));
    },
    hideTopRightBar:function(){
        exec_syn("App", "hideTopRightBar", "{}");
    },
    showTopRightBar:function(){
        exec_syn("App", "showTopRightBar", "{}");
    },
	
    /**
     * 调用环信登录
     * @param {Object} args : {id:"xxx",password:"yyy"}
     */
    hxLogin: function (args) {
        exec_syn("App", "hxLogin", JSON.stringify(args));
    },
    /**
     * 调用环信退出登录
     */
    hxLogout: function () {
        exec_syn("App", "hxLogout", "{}");
    },
    /**
     * 跳转到原生页面
     *
     * @param viewName - （image：相册；dance：热舞；song：热曲；chat：聊天界面;password: 支付密码）
     *            预定义的页面名称
     * @param args －
     *            bundle参数
     *                ——当viewName为chat时，传个id的参数，代表聊天 对方的会员id 或 群id；chatType：类型（单聊-1，群聊-2，聊天室-3）
     *                ——当ViewName为image时，传个type的参数，type = 0，代表进入自己的相册可以编辑；type = 1，代表进入别人的相册，不可编辑,name=string用户名称
     * @param callback -
     *            调用成功返回时调用的函数
     * @param fail －
     *            调用失败时执行的函数
     * @since 1.0.8
     */
    jumpToNativeView: function (viewName, args, callback, fail) {
        if (typeof args == 'undefined')
            args = {};
        var json = args;
        json["viewName"] = viewName;
        if(!json.hasOwnProperty('isMyself')) json['isMyself'] = 0;
        //console.log(JSON.stringify(json))
        exec_asyn("App", "jumpToNativeView", JSON.stringify(json), callback,
            fail);
    },

    /*
     *
     * 弹出原生层
     * @param viewName - （share：分享；pay：支付密码）
     * @param callback -  调用成功返回时调用的函数
     * @param fail － 调用失败时执行的函数
     *
     */
    popUpNativeView:function(viewName,args,callback,fail){
        if (typeof args == 'undefined')
            args = {};
        var json = args;
        json["viewName"] = viewName;
        exec_asyn("App", "popUpNativeView", JSON.stringify(json), callback,fail);
    },
    /*
     * 关闭原生层 
     * @param type - （share：分享；pay：支付密码）
     */
    hideNativeView:function(type){
        var json = {
            "type":type
        }
        exec_syn("App", "hideNativeView", JSON.stringify(json));
    },
    /*
     * 清除原生支付界面的密码输入框
     * 
     */
    clearNativePayInput:function(){
        exec_syn("App", "clearNativePayInput", "{}");
    },
    /*
     *  获取签到信息
     *  返回经纬度跟是否可以签到的信息
     *  返回json
     *      isSuccess: 0(地位失败)||1(定位成功)
     *      定位成功才有的字段
     *          latitude: 纬度
     *          longitude: 经度
     *          isCheckin: 0||1  (是否可以签到)
     * */
    getChekinInfo:function(callback){
        var json = {};
        exec_asyn("App", "getChekinInfo",JSON.stringify(json), callback);
    },
    /**
     * 清除缓存
     * @param args
     */
    clearCache: function(args){
        return exec_syn("App", "clearCache", JSON.stringify(args));
    },
    /**
     * 设置标题（内容为：文字或图片）
     * @param {Object} args: 如 {type:"text",value:"catwalk"}
     * type：取值text，文本；localImage，本地图片；remoteImage，网络图片
     */
    setTitleOrImage:function(args){
        exec_syn("App", "setTitleOrImage", JSON.stringify(args));
    },

    /**
     * 分享这个app
     * @param {Object} data {title:"分享标题",message:"分享内容",img:"分享图片链接",link:"分享链接"}
     * @param success
     * @param fail
     */
    shareApp: function(data,success,fail){
        var args = {
            title:data.title,
            message:data.message,
            img: data.img,
            link: data.link
        };
        exec_asyn("App","shareApp",JSON.stringify(args),success,fail);
    },
    /**
     * 开启或关闭免打扰模式
     * @param flag true/false
     */
    disturb:function(flag){
        Preference.put(Conf.keys.DISTURB,flag,"Catwalk");
    }

};




/**
 * 文件操作
 */
var File = {
    SERVICE: "File",
    /**
     * 拷贝
     * @param {String} path    原文件路径名
     * @param {String} newpath 目标路径名
     * @return {String} like 'ok'
     * @since 1.0.0
     */
    copy: function (path, newpath) {
        var json = {
            "path": path,
            "newpath": newpath
        };

        var json_str = JSON.stringify(json);
        return exec_syn(File.SERVICE, "copy", json_str);
    },

    /**
     * 文件是否存在
     * @param {String} path    原文件路径名
     * @return {String} 'true'表示存在；'false'表示不存在
     * @since 1.0.0
     */
    exists: function (path) {
        var json = {
            file_path: path
        };

        var json_str = JSON.stringify(json);
        return exec_syn(File.SERVICE, "exists", json_str);
    },

    /**
     * 删除文件
     * @param {String} path    原文件路径名
     * @return {String} 'true'表示删除成功；'false'表示删除不成功
     * @since 1.0.0
     */
    remove: function (path) {
        var json = {
            "path": path
        };
        return exec_syn(File.SERVICE, "delete", JSON.stringify(json));
    }

};


var Dialog = {

    //showSingleChik
    showSingleChoiceDialog: function (title, list, check_item, display_key, callback) {
        //alert ("liuningjie");
        var json = {
            "title": title,
            "list": list,
            "checkedItem": check_item,
            "displayKey": display_key
        };
        return exec_asyn("Dialog", "showSingleChoiceDialog", JSON.stringify(json), callback, null);
    },
    // 取消等待框
    dismissDialog: function (id) {
        var json = {
            "service": "showWaitDialog",
            "action": "dismissDialog",
        };
        JIEJUEH5.callNative(JSON.stringify(json));
    },

    showProgressDialog: function (title, msg) {

        var json = {
            "service": "showWaitDialog",
            "action": "showProgressDialog",
        };
        var msgJson = {
            "msg": msg,
        };
        JIEJUEH5.callNative(JSON.stringify(json), JSON.stringify(msgJson));
    },
    //弹出等待框
    showWaitDialog: function (title, msg) {

        var json = {
            "service": "showWaitDialog",
            "action": "showWaitDialog"
        };
        var msgJson = {
            "msg": msg
        };
        JIEJUEH5.callNative(JSON.stringify(json), JSON.stringify(msgJson));
    },


    //alert: function(msg){
    //    return exec_syn("Dialog","alert",msg);
    //
    //}
    alert: function (msg) {
        var msgJson = {
            "msg": msg,
        };

        exec_asyn("Dialog", "alert", JSON.stringify(msgJson), function () {
        }, function () {
        });

    },
    closeDialog: function () {
        exec_asyn("Dialog", "closeDialog", {}, function () {
        }, function () {
        });
    }

}



// Toast提示。功能如同android Toast
var Toast = {

    LENGTH_LONG: 1,
    LENGTH_SHORT: 0,

    makeText: function (text) {

        !text ? text = "系统异常":"";
        var data = {
            "alertKey":text,
            "type":"success"
        }

        exec_syn("alert","alertClick",JSON.stringify(data));

        //var msgJson = {
        //    "msg": text
        //};
        //
        //
        //exec_asyn("Toast", "makeText", JSON.stringify(msgJson), function () {
        //}, function () {
        //});
    }

};

//联系人
var Contacts = {
    //打开联系人
    openContacts: function (success, fail) {
        exec_asyn("Contacts", "openContacts", '{}', success, fail);
    },
    //打电话
    tel: function (tel) {
        var json = {

            "tel": tel
        }
        return exec_syn("Contacts", "call", JSON.stringify(json));
    }
}

var Preference = {
    // 存储
    put: function (key, value, prefname) {
        var args = {
            "key": key,
            "value": value,
            "prefname": prefname
        };
        exec_asyn("Preference", "put", JSON.stringify(args));
    },
    // 取值
    get: function (key, defValue, prefname) {
        var args = {
            "key": key,
            "defValue": defValue,
            "prefname": prefname
        };
        return exec_syn("Preference", "get", JSON.stringify(args));
    }
}


/**
 * native提供uitl。
 */
var util = {
    /**
     * 实现base64编码
     * @params {JSON} data {name:'ztm';card:'6225'}
     * @return {JSON} result {name:"enRt";card:"NjIyNQ=="}
     * @since 1.0.6
     */
    base64Encode: function (jsonobj) {
        if (typeof(jsonobj) == "undefined" || typeof(jsonobj) != "object") {
            return false;
        } else {

            var _result = "";
            _result = exec_syn("UtilPlugin", "base64Encode", JSON.stringify(jsonobj));
            //            alert(_result);
            return _result;
        }
    },
    /**
     * 实现base64解码
     * @params {JSON} data {name:"enRt";card:"NjIyNQ=="}
     * @return {JSON} result {name:'ztm';card:'6225'}
     * @since 1.0.6
     */
    base64Decode: function (jsonobj) {
        if (typeof(jsonobj) == "undefined" || typeof(jsonobj) != "object") {
            return false;
        } else {
            var _resultJson = {};
            var _result = "";

            _result = exec_syn("UtilPlugin", "base64Decode", JSON.stringify(jsonobj));

            return _result;
        }
    }
}

var makeAlert = function (text) {
   // alert(text);
}


var JIEJUEH5 = {
    idCounter: 0, //参数序列计数器
    INPUT_CMDS: {}, //入参服务与命令名
    INPUT_ARGS: {}, //入参的参数
    OUTPUT_RESULTS: {}, //输出的结果
    CALLBACK_SUCCESS: {}, //输出的结果成功时调用的方法
    CALLBACK_FAIL: {},    //输出的结果失败时调用的方法
    /*
     * exec/exec_asyn调用的方法
     * @params {JSONObject} cmd 		服务名和动作命令
     * @params {String} args			参数
     * @params {JS FUNCTION} success			成功时回调函数
     * @params {JS FUNCTION} fail			失败时回调函数
     */
    callNative: function (cmd, args, success, fail) {
        var key = "ID_" + (++this.idCounter);
        this.INPUT_CMDS[key] = cmd;
        this.INPUT_ARGS[key] = args;
        if (typeof success != 'undefined') this.CALLBACK_SUCCESS[key] = success;
        if (typeof fail != 'undefined') this.CALLBACK_FAIL[key] = fail;
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", comTag+"://ready?id=" + key);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;

        return this.OUTPUT_RESULTS[key]; //同步调用时返回值
    },
    /*
     * 获取执行服务和动作
     * @params {String} key			队列标识
     */
    getInputCmd: function (key) {
        return this.INPUT_CMDS[key];
    },
    /*
     * 获取执行参数
     * @params {String} key			队列标识
     */
    getInputArgs: function (key) {
        return this.INPUT_ARGS[key];
    },
    /*
     * 回调返回结果函数
     * @params {String} result		后台处理的结果
     * @params {String} key			队列标识
     */
    callBackJs: function (result, key) {

        this.OUTPUT_RESULTS[key] = result;

        var obj = JSON.parse(result);
        var message = obj.message;
        console.log(message);
        //CALLBACK_SUCCESS 不能传对象只能传字符串值，所以要将返回的对象变成字符串
        try{
            JSON.parse(message);
        }catch(e){
            //            alert(typeof message);
            //            alert(e.message);
            try{
                message = JSON.stringify(message);
                console.log('test message'+message);
            }catch(e){
                alert(e.message);
            }

        }

        var status = obj.status;
        if (status == 0) {
            if (typeof this.CALLBACK_SUCCESS[key] != "undefined"){
                setTimeout("JIEJUEH5.CALLBACK_SUCCESS['" + key + "']('" + message + "')", 0);
            }

        } else {
            if (typeof this.CALLBACK_FAIL[key] != "undefined")
                setTimeout("JIEJUEH5.CALLBACK_FAIL['" + key + "']('" + message + "')", 0);
        }
    }
};

//异步
var exec_asyn = function (service, action, args, success, fail) {

    var json = {
        "service": service,
        "action": action
    };

    function doSuccess(result){
        try {
            result = JSON.parse(result);//如果是json字符串的话转成json字符串
            success(result);
        } catch (e) {
            console.error(e.message);
            success(result);//如果不是json字符串的话直接处理
            return null;
        }
    }

    //JIEJUEH5.callNative(JSON.stringify(json), args, success, fail);
    JIEJUEH5.callNative(JSON.stringify(json), args, doSuccess, fail);
}

//同步
var exec_syn = function (service, action, args) {

    var json = {
        "service": service,
        "action": action
    };

    var result_str = JIEJUEH5.callNative(JSON.stringify(json), args);
    var result;
    try {

        result = JSON.parse(result_str);
        var status = result.status;
        var message = result.message;
        return message;
    } catch (e) {
        console.error(e.message);
        return null;
    }


}


/*
 * MD5加密
 */

////////////////////////////////
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance */
var chrsz = 8;
/* bits per input character. 8 - ASCII; 16 - Unicode */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}
function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}
function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data));
}
function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data));
}

/* Backwards compatibility - same as hex_md5() */
function calcMD5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 )) & 0xF);
    }
    return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * ( i % 4)) & 0xFF) << 16)
            | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8 )
            | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}

onerror = function (l, u, m) {
    var msg = ['line:', l, '\n url:', u, '\n message:', m, '\n'].join('');
    printMessage(msg);
}


console.log = function (log) {
    printMessage(log);
}

function printMessage(log) {
    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", "ios-log:#iOS#" + log);
    document.documentElement.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null;
}
