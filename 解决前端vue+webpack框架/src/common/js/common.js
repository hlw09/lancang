
//公用方法
export let Util={
	//token
    // token : '0a4af4b6f86e48b59570c07f72e76a36',
    // token : window.localStorage.getItem('token'),
    // 拿取URL
    getUrl: function () {
	    // var url ;
        let url = 'http://bmp.happyptv.cn/mtapi/';//正式环境
        // //return url;
        var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (!isIOS) {
		    url =JSON.parse(App.serverBaseUrl()).baseUrl+'/mtapi/';//从安卓原生拿的环境url
        }else{
		    url =App.serverBaseUrl().baseUrl+'/mtapi/';//从ios原生拿的环境url
            // url ='http://bmp.happyptv.cn/mtapi/';//从ios原生拿的环境url
        }
		// alert(url)
    		return url;
	},
	//获取域名
	getRtUrl: function () {
	    //let url = 'https://test.happyptv.cn/catwalk/api';//测试环境
		let url = 'http://bmp.happyptv.cn/mtapi/';//正式环境
		
		var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if (!isIOS) {
		    url =JSON.parse(App.serverBaseUrl()).baseUrl+'/mtapi/';//从安卓原生拿的环境url
		}else{
		    url =App.serverBaseUrl().baseUrl+'/mtapi/';//从ios原生拿的环境url
		}
    		return url;
	},
	//获取登录信息
	info:function(){
        let info;
   	 	if(Util.memberInfo.get()){
             info = Util.memberInfo.get();
		}else{
			 // info = JSON.parse(localStorage.getItem('mtinfo'));
             info = {token:''}
             // info = {token:'75e1315d7b56485d849d9aba5b697ee6',mobileNo:'13539853655',wechatOpenId:1}
		}
        // console.log(info);
        return info;
	},
	//倒计时
	cutdown: function(time,updateCallback, completeCallback) {
       var timer = setInterval(function () {

            if (time == 0) {
                clearInterval(timer);
                completeCallback && completeCallback();
            } else {
                time--;
                updateCallback && updateCallback(time);
            }

        }, 1000);

        return timer;
	},
    //时间戳格式化
    formatData:function(temp) {
        var date = new Date(temp * 1);
        var year = date.getFullYear(),
            month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
            day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
            hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
            minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
            second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();

        return {
            date: year + '-' + month + '-' + day,
            datetime: month + '-' + day + ' ' + hour + ':' + minute,
            time: hour + ':' + minute,
            all: year + '-' + month + '-' + day + '  ' + hour + ':' + minute,
            allTime: year + '-' + month + '-' + day + '    ' + hour + ':' + minute + ':' + second,
            clubAll:year+'-'+month+'-'+day+'  '+hour+':'+minute+':'+second,
            clubTop:year+'-'+month+'-'+day,
            clubBottom:hour+' : '+minute+' : '+second,
            yearMon:year+'-'+month,
			monday:month+'-'+day,
            day:day,
            month:month,
        };
    },
	//拿取URL
	urlParse: function() {
		let url = window.location.search;
		let obj = {};
		let reg = /[?&][^?&]+=[^?&]+/g;
		let arr = url.match(reg);
		// ['?id=12345', '&a=b']
		if (arr) {
			arr.forEach((item) => {
				let tempArr = item.substring(1).split('=');
				let key = decodeURIComponent(tempArr[0]);
				let val = decodeURIComponent(tempArr[1]);
				obj[key] = val;
			});
		}
		return obj;
	},
	 //加载指示器
    showIndicator:function () {
        if ($('.preloader-indicator-modal')[0]) return;
        $(document.body ? document.body : 'body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
    },
    hideIndicator:function () {
        $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
    },
    //安卓软键盘遮挡网页控件
    bindAndroidScroll : function(percent){
        if(!percent){
            percent=0.28;
        }
        var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (!isIOS) {
            setTimeout(function () {
                var viewH = screen.height;
                var scrollH = viewH*percent;
                $('#Login').cscrollTop(scrollH);
            }, 300);// 弹出键盘后0.5秒 再隐藏，有的安卓手机反应慢
        };
    },
    setKeyEventListener : function (isback, callback) {
		App.overrideBackPressed(isback);
		App.setKeyEventListener(callback);
	},
	//会员信息存取
    memberInfo: {
        get: function () {

            //return loginTest;

            var menberInfo = Preference.get('MENBERINFO', null, 'PTV');

            try {
                menberInfo = JSON.parse(menberInfo);
            } catch (e) {
            }
            return menberInfo;
        },
        set: function (obj) {
            Preference.put('MENBERINFO', JSON.stringify(obj), 'PTV');
        },
        remove: function () {
            Preference.put('MENBERINFO', JSON.stringify({}), 'PTV');
        }
    },
	//字符串中是否含有emoji表情
    isEmojiCharacter : function (substring) {
		for ( var i = 0; i < substring.length; i++) {
			var hs = substring.charCodeAt(i);
			if (0xd800 <= hs && hs <= 0xdbff) {
				if (substring.length > 1) {
					var ls = substring.charCodeAt(i + 1);
					var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
					if (0x1d000 <= uc && uc <= 0x1f77f) {
						return true;
					}
				}
			} else if (substring.length > 1) {
				var ls = substring.charCodeAt(i + 1);
				if (ls == 0x20e3) {
					return true;
				}
			} else {
				if (0x2100 <= hs && hs <= 0x27ff) {
					return true;
				} else if (0x2B05 <= hs && hs <= 0x2b07) {
					return true;
				} else if (0x2934 <= hs && hs <= 0x2935) {
					return true;
				} else if (0x3297 <= hs && hs <= 0x3299) {
					return true;
				} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
					|| hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
					|| hs == 0x2b50) {
					return true;
				}
			}
		}
	}
};
/**
 * 求两点经纬度距离
 * 
 */
export function getFlatternDistance(lat1,lng1,lat2,lng2){  
		var EARTH_RADIUS = 6378137.0;    //单位M
  		var PI = Math.PI; 
  		var MPI = PI/180.0
	     var f = MPI*((lat1 + lat2)/2);  
	  
	     var g = MPI*((lat1 - lat2)/2);  
	  
	     var l = MPI*((lng1 - lng2)/2);  
	  
	     var sg = Math.sin(g);  
	  
	     var sl = Math.sin(l);  
	  
	     var sf = Math.sin(f);  
	     var s,c,w,r,d,h1,h2;  
	  
	     var a = EARTH_RADIUS;  
	  
	     var fl = 1/298.257;  
	     sg = sg*sg;  
	  
	     sl = sl*sl;  
	  
	     sf = sf*sf;  
	     s = sg*(1-sl) + (1-sf)*sl;  
	  
	     c = (1-sg)*(1-sl) + sf*sl;  
	     w = Math.atan(Math.sqrt(s/c));  
	  
	     r = Math.sqrt(s*c)/w;  
	  
	     d = 2*w*a;  
	  
	     h1 = (3*r -1)/2/c;  
	  
	     h2 = (3*r +1)/2/s;  
	     return parseInt(d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg)));  
} ;
