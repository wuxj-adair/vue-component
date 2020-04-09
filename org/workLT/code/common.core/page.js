var	KEY_BACK 		 = 0x0008; 	// 返回/删除
var KEY_ENTER 		 = 0x000D; 	// 确定
var KEY_PAGE_UP		 = 0x0021;	// 上页
var KEY_PAGE_DOWN    = 0x0022;  // 下页
var KEY_LEFT		 = 0x0025;  // 左
var	KEY_UP			 = 0x0026;  // 上
var KEY_RIGHT 		 = 0x0027;	// 右
var	KEY_DOWN 		 = 0x0028;	// 下
var KEY_0 			 = 0x0030;  // 0       
var KEY_1 			 = 0x0031;  // 1
var KEY_2 			 = 0x0032;  // 2
var KEY_3 			 = 0x0033;  // 3
var KEY_4 			 = 0x0034;  // 4
var KEY_5			 = 0x0035;  // 5
var KEY_6 			 = 0x0036;  // 6 
var KEY_7 			 = 0x0037;  // 7
var KEY_8 			 = 0x0038;  // 8
var KEY_9 			 = 0x0039;  // 9
var KEY_VOL_UP 		 = 0x0103; 	// Vol+，音量加
var KEY_VOL_DOWN 	 = 0x0104;	// Vol-，音量减
var	KEY_MUTE 		 = 0x0105;	// Mute，静音
var	KEY_TRACK 		 = 0x0106;	// Audio Track，切换音轨
var KEY_PLAY_PAUSE   = 0x0107;	// >||，播放，暂停
var KEY_FAST_FORWARD = 0x0108;	// >> ，快进
var	KEY_FAST_REWIND  = 0x0109;	// << ，快退
var KEY_IPTV_EVENT   = 0x0300;	// 虚拟事件按键
var KEY_RED 		 = 0x0113;  // 红色键
var KEY_GREEN        = 0x0114;	// 绿色键
var KEY_YELLOW		 = 0x0115;  // 黄色键
var KEY_BLUE         = 0x0116;  // 蓝色键

// 常用函数
function G(id){return document.getElementById(id);}
function S(id){G(id).style.visibility = 'visible';}
function H(id){G(id).style.visibility = 'hidden';}

// 命名空间
var Page = {
	/** 调用函数 */
	call: function(fn, args){
		if(typeof fn == "string"){
			return eval("("+fn+")");
		}else if(typeof fn == "function"){
			if(this.isArray(args)){
				return fn.apply(window, args);
			}
		}
	},// end of call
	
	isArray: function(o){
		return Object.prototype.toString.call(o) === '[object Array]' || (o instanceof Array); 
	},
	
	/** iPanel3.0,webkit可用 */
	ajax: function(config)
	{
		var url = config.url;
		var data = config.data;
		var type = (config.type || 'GET').toUpperCase();
		var contentType = config.contentType||'application/x-www-form-urlencoded';
		var dataType = config.dataType;
		var headers = config.headers || [];
		var fnSuccess = config.success;
		var fnError = config.error;
		var xmlhttp;
		if(window.XMLHttpRequest)
			xmlhttp = new XMLHttpRequest();
		else
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		
		xmlhttp.onreadystatechange = function()
		{
			if(xmlhttp.readyState==4)
			{
				var rsp = xmlhttp.responseText||xmlhttp.responseXML;
				if(dataType=='json')
					rsp = eval("("+rsp+")");
				if(xmlhttp.status==200)
					Page.call(fnSuccess, [xmlhttp, rsp]);
				else
					Page.call(fnError, [xmlhttp, rsp]);
			}
		};
	
		xmlhttp.open(type,url,true);
		for(var i=0; i<headers.length; ++i)
		{
			xmlhttp.setRequestHeader(headers[i].name, headers[i].value);
		}
		xmlhttp.setRequestHeader('Content-Type', contentType);
		
		if(typeof data == 'object' && contentType=='application/x-www-form-urlencoded')
		{
			var s = '';
			for(attr in data)
			{
				s += attr+'='+data[attr]+'&';
			}
			if(s)
			{
				s = s.substring(0,s.length-1);
			}
			xmlhttp.send(s);
		}
		else
			xmlhttp.send(data);
	},
	
	addLog: function(url, async)
	{
		var xmlHttp = null;
		if(window.XMLHttpRequest)
			xmlHttp = new XMLHttpRequest();
		else if(window.ActiveXObject)
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		if(xmlHttp)
		{
			xmlHttp.open("GET", url, async);
			xmlHttp.send(null);
			xmlHttp = null;
		}
		else
		{
			var img = document.createElement('img');
			img.src = url;
			img.style.visibility = 'hidden';
			document.body.appendChild(img);
		}
	}
};


// 自定义按钮
Page.Button = {
	
	/** 初始化按钮 */
	init: function(config){
		this.eager = config.eager; // 是否要热抓取图片
		this.previous = null,
		this._buttonStore = {};
		var preloadImages = [];
		for(var i=0,max=config.buttons.length; i<max; ++i){
			var button = config.buttons[i];
			this._buttonStore[button.id] = button;
			if((this.eager||button.eager) && button.focusImage){ // 热抓取图片如果需要
				preloadImages.push(button.focusImage);
			}
		}
		var tempObj={};
		for(var i=0; i<preloadImages.length; ++i){
			tempObj[preloadImages[i]] = 1;
		}
		for(var attr in tempObj){
			var img = new Image();
			img.src = attr;
		}
		
		// 设置默认获得焦点的按钮
		if(config.defaultButtonId){
			if(typeof config.defaultButtonId=="string"){
				var button = this.get(config.defaultButtonId);
				if(button && !button.disabled){
					this.current = button; 
				}
			}else{
				for(var i=0,max=config.defaultButtonId.length; i<max; ++i){
					var button = this.get(config.defaultButtonId[i]);
					if(button && !button.disabled){
						this.current = button;
						break;
					}
				}
			}
			this.update();
		}
	},// end of init
	
	/** 获取按钮 */
	get: function(id){
		if(G(id)){
			return this._buttonStore[id];
		}
	},// end of get
	
	/** 移动 */
	move: function(dir){
		var button;
		var nextButtonId = this.current[dir];
		if(nextButtonId){
			if(typeof nextButtonId == "string"){
				button = this.get(nextButtonId);
				if(button && !button.disabled){
					this.previous = this.current;
					this.current = button;
				}
			}else{
				for(var i=0,max=nextButtonId.length; i<max; ++i){
					button = this.get(nextButtonId[i]);
					if(button && !button.disabled){
						this.previous = this.current;
						this.current = button;
						break;
					}
				}
			}
			this.update();
		}
	},// end of move
	
	/** 显示设置初始获得焦点的按钮 */
	set: function(buttonId){
		var button = this.get(buttonId);
		if(button && !button.disabled){
			this.previous = this.current;
			this.current = button;
			this.update();
		}
	}, // end of set
	
	/** 点击确定按钮 */
	click: function(interceptor){
		if(interceptor){
			Page.call(interceptor, [this.current]); // 在点击按钮前可以执行一个自定义函数，比如统计按钮点击功能
		}
		if(this.current.click){
			var name = this.current.click.name;
			var action = Page.Action[name];
			this.current.action = 'click';
			Page.call(action, [this.current]);
		}
	},// end of click
	
	/** 更新 */
	update: function(){
		var prev = this.previous;
		var current = this.current;
		if(prev){
			if(prev.linkImage){
				G(prev.id).src = prev.linkImage;
			}
			if(prev.blur){
				var name = prev.blur.name;
				var action = Page.Action[name];
				prev.action = 'blur';
				Page.call(action, [prev]);
			}
		}
		if(current){
			if(current.focusImage){
				G(current.id).src = current.focusImage;
			}
			if(current.focus){
				var name = current.focus.name;
				var action = Page.Action[name];
				current.action = 'focus';
				Page.call(action, [current]);
			}
		}
	}// end of update
};

/** 按键处理 */
document.onkeydown = function(e){
	e = e || window.event;
	var keyCode = e.which || e.keyCode;
	if(keyCode==KEY_IPTV_EVENT){
		eval("oEvent = " + Utility.getEvent());
		Page.eventHandler(oEvent.type,true);
	}else{
		Page.eventHandler(keyCode);		
	}
};

/** startWith */
String.prototype.startWith=function(str){    
	  var reg=new RegExp("^"+str);    
	  return reg.test(this);       
}  ;