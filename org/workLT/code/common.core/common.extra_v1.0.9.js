
/**
 * 显示一个元素，与S不同的是，修改的是display属性<br>
 * add by lxa 20140922
 * 修改visibility的最大缺点是：如果子元素是显示的话，即使父元素隐藏了子元素也不会隐藏
 * @param id
 */
function Show(id)
{
	var temp = G(id);
	if(temp)
		temp.style.display = 'block';
}
/**
 * 隐藏一个元素，与H不同的是，修改的是display属性<br>
 * add by lxa 20140922
 * 修改visibility的最大缺点是：如果子元素是显示的话，即使父元素隐藏了子元素也不会隐藏
 * @param id
 */
function Hide(id)
{
	var temp = G(id);
	if(temp)
		temp.style.display = 'none';
}

/**
 * 转换地址为全地址
 * 
 */
function getFullImageSrc(src)
{
    if(!(src.indexOf('http')>=0))
    {
        return '/' + location.href.split('/')[3] + '/'+ src;
    }
    return src;
}

/**
 * 获取上下文路径，不带最后面的“斜杠”，形如：/health-sd
 * @returns {String}
 */
Epg.getBasePath = function()
{
	var contextPath = '/' + location.href.split('/')[3];
	return contextPath;
};

/**
 * 判断对象是否是数组，add by lxa 20140923
 * @param obj 要判断的对象
 */
Epg.isArray = function(obj)
{
	return (obj instanceof Array); 
};

/**
 * 默认提示方法
 * @param info 提示文字
 * @param second 显示的秒数，默认3秒，如果为0那么永久显示
 */
Epg.tip = function(info, second)
{
	if(info === undefined || info === '')//info为空时不产生任何效果
		return;
	second = second===undefined?3:second;
	G('default_tip').innerHTML=info;
	S('default_tip');
	if(second>0)
	{
		if(Epg._tip_timer)//如果上次执行过setTimeout，那么强行停止
			clearTimeout(Epg._tip_timer);
		Epg._tip_timer = setTimeout('H("default_tip")',second*1000);
	}
};

/**
 * 默认提示方法
 * @param info 提示文字
 * @param second 显示的秒数，默认3秒，如果为0那么永久显示
 */
Epg.ykqTip = function(info, second)
{
	second = second===undefined?3:second;
	G('ykq_tip').innerHTML = info;
	//S('ykq_tip');
	if(second>0)
	{
		if(Epg._ykq_tip_timer)//如果上次执行过setTimeout，则强行停止计时器
			clearTimeout(Epg._ykq_tip_timer);
		Epg._ykq_tip_timer = setTimeout('H("ykq_tip")',second*1000);
	}
};

/**
 * 分页方法
 * @param url 要跳转的url，必须页码必须是最后一个参数，且“=”结尾
 * @param idx 要跳转的页码
 * @param pageCount 总页数，只有下一页时才用到
 */
Epg.page = function(url, idx, pageCount)
{
	idx = parseInt(idx);
	if(idx < 1)
		Epg.tip('已经是第一页了！');
	else if(pageCount !== undefined && idx > parseInt(pageCount))
		Epg.tip('已经是最后一页了！');
	else
	{
		url += idx;
		if(pageCount === undefined)//如果是上一页（一般上一页时不传此参数，当然这个判断不准确），修改OTT版的移动动画向右
			url += '&transition_animate_dir=right';
		Epg.jump(url);
	}
};

/**
 * 跳转
 * @param href 要跳转的url
 * @param f 焦点按钮，默认当前按钮ID
 * @deprecated 不建议使用本方法
 */
Epg.jump = function(href,f)
{
	if(f === undefined)
		f = Epg.btn.current.id;
	window.location.href = href+'&f='+f;
};

/**
 * 用于开发时控制台输出信息，上线后注释内部代码即可
 * @param info 
 */
Epg.debug = function(info)
{
	if(debug_mode && typeof console !== 'undefined' && console.log)
		console.log(info);
};

/**
 * 与遥控器按键相关的方法，不影响旧版代码
 */
Epg.key = 
{
	/**
	 * 所有与按键相关的方法都放在这里
	 */
	keys:
	{
		KEY_5: function(){if(debug_mode)location.reload();}//如果是开发模式，按5刷新
	},
	ids: {},
	/**
	 * 逐个添加或者批量添加按键配置
	 */
	set: function(code, action)
	{
		if(typeof code === 'string' && action !== undefined)//如果是单个添加
		{
			//注意不能这样写：code={code:action}
			var _code = code;
			code = {};
			code[_code] = action;
		}
		if(typeof code === 'object')//批量添加
		{
			var obj = code;
			for(var i in obj)
			{
				if(i.indexOf('KEY_') === 0 || i.indexOf('EVENT_') === 0)//如果是“KEY_”或者“EVENT_”开头，视作按键
					this.keys[i] = obj[i];
				else//否则，视作和按钮ID相关的方法
					this.ids[i] = obj[i];
			}
		}
		else if(typeof code === 'number')//根本不允许出现这种错误！
		{
			alert('错误：添加按键映射时code不能为number类型！');
		}
		return this;
	},
	/** 和set方法一个意思 */
	add: function(code, action)
	{
		return this.set(code, action);
	},
	/**
	 * 逐个删除或者批量删除按键配置
	 */
	del: function(code)
	{
		if(!(code instanceof Array))
			code = [code];
		for(var i=0; i<code.length; i++)
		{
			if(this.ids[code[i]])
				this.ids[code[i]] = 'Epg.key.emptyFn()';
			if(this.keys[code[i]])
				this.keys[code[i]] = 'Epg.key.emptyFn()';//标清机顶盒delete有问题
		}
		return this;
	},
	/** 空方法，用于删除时 */
	emptyFn: function(){},
	/**
	 * 初始化eventHandler，随便什么时候调用、调用一次即可
	 */
	init: function()
	{
		if(!Epg.eventHandler)//避免重复定义
		{
			Epg.eventHandler = function(code)
			{
				for(var i in Epg.key.ids)//ID判断方法必须先执行，原因自己分析！
					if(Epg.Button.current.id === i)
						Epg.call(Epg.key.ids[i],code);
				for(var i in Epg.key.keys)
					if(code === window[i])
						Epg.call(Epg.key.keys[i],code);
			};
		}
	}
};

/**
 * JS操作cookie工具类，add by lxa 20140529
 */
Epg.cookie=
{
	/**
	 * 从js中获取cookie
	 * 由于标清机顶盒decodeURI有问题，所以获取cookie时不再自动URL解码
	 * 存cookie的时候，java代码里面存中文的话就URL编码一下，js获取时不做解码
	 * @param cookie_name cookie名字
	 * @param default_value 默认值
	 * @param parseNumber 是否强转数字
	 * @param unescape 是否使用unescape来解码，注意，这个一般只用来解码“:/”等之类的简单符号，对于中文，整个机顶盒都甭想
	 * @returns
	 */
	get: function(cookie_name, default_value, parseNumber, isUnescape)
	{
		var temp = new RegExp('(^|;| )'+cookie_name+'=([^;]*)(;|$)', 'g').exec(document.cookie);
		if(temp!=null)
		{
			var value=temp[2];
			if(value === '""')//使用Java删除cookie时并不会立即删除，而是变成双引号，update by lxa 20150420
				return default_value;
			if(parseNumber==true)
				return parseFloat(value);
			if(isUnescape)//update by lxa 20150319，参数名和默认的unescape方法名重了，所以改为isUnescape
				return unescape(value);//URL解码，暂时用unescape代替，具体有没有问题有待日后观察
			return value;
		}
		return default_value;
	},
	/**
	 * 设置cookie
	 * @param name cookie名称
	 * @param value cookie内容，注意cookie内容不能有分号、逗号、等号、空格等特殊字符，中文就更不可以，所以注意使用escape
	 * @param day cookie失效天数，默认30天
	 * @param path cookie的作用范围，默认当前项目下
	 */
	set: function(name, value, day, path)
	{
		day = day==undefined?30:day;
		path = path==undefined?Epg.getBasePath():path;
		var str = name+'='+value+'; ';
		if(day)
		{
			var date = new Date(); 
			date.setTime(date.getTime()+day*24*3600*1000);
			str += 'expires='+date.toGMTString()+'; ';
		}
		if(path)
			str += 'path='+path;
		document.cookie = str;//注意，cookie这样设置并不会覆盖之前所有的cookie！除非同名同path
	},
	/**
	 * 删除cookie
	 * @param name cookie的名字
	 * @param path cookie所在的path，默认contextPath
	 */
	del: function(name, path)
	{
		this.set(name, null, -1, path);
	}
};

/**
 * 字符串工具
 * **/
Epg.string = 
{
	/**
	 * 中文和英文长度不一致，故需要重新计算长度
	 * */
	length:function(str)
	{
		if(str == null) return 0;
		if(typeof str != "string")
		{
		    str += "";
		}
		//把双字节的换成单字节的，然后在计算长度
		return parseInt(str.replace(/[^\x00-\xff]/g,"01").length/2);
	},
	trim:function(str)
	{
		if(str) return str.replace(/^\s*(.*?)\s*$/g,'$1');
	}
};

/**
 * 机顶盒不支持trim方法，故手动写一个
 * add by lxa 20140606
 */
Epg.trim = function(str)
{
	return Epg.string.trim(str);
};

/** HTML操作 */
Epg.Html = Epg.Text = 
{
	rollStart: function(config)
	{
		var id = config.id;
		var amount = config.amount || 1;
		var delay = config.delay || 40;
		var dir = config.dir || 'left';
		if(!this.rollId)
		{
			this.rollId = id;
			this.innerHTML = G(id).innerHTML;
			G(id).innerHTML = '<marquee direction="'+dir+'" behavior="scroll" scrolldelay="'+delay+'" scrollamount="'+amount+'">'+this.innerHTML+'</marquee>';
		}
	},
	rollStop: function()
	{
		G(this.rollId).innerHTML = this.innerHTML;
		this.rollId = null;
	}
};

/**
 * 滚动字幕方法，替换以前的marquee，解决crosswalk上滚动过快的问题，仅用于高清项目<br>
 * 需要common_hd.css中增加相应的样式来配合使用
 * add 20151201
 */
Epg.marquee =
{
	/**
	 * 将div里面的某段静态文字变成滚动字幕，add 20151126
	 * @param maxLength 最长的文字个数，这里英文占一个字符，中文两个字符长度
	 * @param id div的ID，默认当前按钮ID+'_txt'
	 * @param amount 时间，这里含义其实是 速度(speed)，单位是px/s，即 像素每秒
	 * @param delay 延时，这里无意义
	 * @param dir 方向，默认left，这里无意义
	 * @param behavior 滚动方式，alternate为左右来回滚动，scroll为循环滚动，这里无意义
	 */
	start: function(maxLength, id, amount, delay, dir, behavior)
	{
		maxLength = maxLength || 7;
		id = id || Epg.Button.current.id+'_txt';
		amount = amount || 40; // 这里是速度的意思，px/s
		delay = delay || 10; // 无意义参数
		dir = dir || 'left'; // 无意义参数
		behavior = behavior || 'alternate';	
		var marqueeParent = G(id);
		var html = Epg.trim(marqueeParent.innerHTML); // 去掉空格
		if(html.indexOf('class="common_marquee"')>0&&this.innerHTML!=undefined){//确保  marqueeParent.innerHTML  包含重复的  '<div id="'+id+'_marquee" class="common_marquee">'+html+'</div>';
			html=this.innerHTML;
		}
		this.rollId = id; // 将ID存储起来
		this.innerHTML = html; // 将内容存储起来
		var length = Epg.string.length(html);
		if(maxLength !== undefined && length > maxLength)
		{
			marqueeParent.innerHTML = '<div id="'+id+'_marquee" class="common_marquee">'+html+'</div>';
			var marqueeChild = G(id + '_marquee');
			var width1 = parseInt(Epg.css(marqueeParent, 'width'));
			var width2 = parseInt(Epg.css(marqueeChild, 'width'));
			var maxLeft = width2 - width1;
			if(maxLeft <= 0) return; // 如果字幕太短不足以滚动，直接返回不作处理
			var marquee_idx = Math.ceil(maxLeft / 50) * 50;//以50为梯度，计算合适的css
			marquee_idx = marquee_idx > 400 ? 400 : marquee_idx; // 最大400
			var time = (maxLeft / amount).toFixed(2);
			var animation = 'common_marquee_' + marquee_idx +' '+ time + 's linear 50ms infinite alternate';
			marqueeChild.style.webkitAnimation = animation;
			marqueeChild.style.animation = animation;
		}
	},
	/**
	 * 停止滚动字幕
	 */
	stop: function()
	{
		if(this.rollId && this.innerHTML != undefined)
		{
			G(this.rollId).innerHTML = this.innerHTML;
			this.rollId = undefined;
		}
	}
};



/**
 * 使用JS将前端信息输出到后台，add by lxa 20140922
 * update by wyy 
 */
Epg.Log.debug = function(info)
{
	var url = Epg.getContextPath() + 'com/log.jsp?method=debug&info='+escape(info);
	this.ajax(url, true);
};
/**
 * js 日志输出，仿照Log4J写，日志输出的在java 控制台及epg日志上
 * @param level 日志输出级别
 * @param info 日志信息
 * @param name 日志名称
 * @param module 日志的所属模块
 */
Epg.log=
{
	error:function(info,module,name)
    {
	    //错误级别日志
	    this.commn('error',info,module,name);
    },
    warn:function(info,module,name)
    {
        //警告级别日志
        this.commn('warn',info,module,name);
    },
    trace:function(info,module,name)
    {
        //跟踪级别日志
        this.commn('trace',info,module,name);
    },
    info:function(info,module,name)
    {
        //普通日志
        this.commn('info',info,module,name);
    },
    debug:function(info,module,name)
    {
        //调试日志
        this.commn('debug',info,module,name);
    },
    commn:function(level,info,module,name)
    {
        var url = Epg.getContextPath() + 'com/log.jsp?method=recordLog&level='+level;
        if(info === undefined || info == '')
        {
            //日志内容为空不存
            return;
        }
        else
        {
            url += "&data="+encodeURIComponent(info);
        }
        if(module != undefined && module != '')
        {
            url += "&module="+encodeURIComponent(module);
        }
        if(name != undefined)
        {
            url += '&name='+encodeURIComponent(name);
        }
        Epg.Log.ajax(url, true);
    }
};

/**
 * 使某张图片或者按钮闪烁，一个页面最多只能有一个按钮闪烁
 * add by lxa 20140922
 */
Epg.twinkle = 
{
	/**
	 * 开始闪烁，如果另一个按钮没有停止闪烁会强行停止
	 * @param id 图片或者某个按钮的ID
	 * @param time 多长时间闪烁一次，默认200毫秒
	 */
	start: function(id, time)
	{
		this.stop();//防止未停先起
		id = id || Epg.btn.current.id;
		time = (typeof time === 'number') ? time : 200;//默认200毫秒闪烁一次
		this._id = id;//之所以不直接用id是因为部分标清盒子要求这里的变量必须是全局的
		this._is_hide = false;//标记是否是隐藏的
		this._timer = setInterval(function()
		{
			if(Epg.twinkle._is_hide)
				S(Epg.twinkle._id);
			else
				H(Epg.twinkle._id);
			Epg.twinkle._is_hide = !Epg.twinkle._is_hide;//取反
		}, time);
	},
	/**
	 * 停止闪烁
	 */
	stop: function()
	{
		if(this._timer)
		{
			clearInterval(this._timer);
			this._timer = undefined;
			S(Epg.twinkle._id);//停止闪烁后恢复显示
		}
	}
};

/**
 * 字符串转驼峰形式，add by lxa 20140923
 * 示例一：$.toHump('get_param')，返回getParam
 * 示例二：$.toHump('font-size','-')，返回fontSize
 * @param str
 * @param 分割的标志，默认为“_”
 */
Epg.toHump = function(str, flag)
{
	flag = flag ? flag : '_';
	var temp = str.match(eval('(/'+flag+'(\\w)/g)'));
	for(var i=0; temp!=null&&i<temp.length; i++)
		str=str.replace(temp[i],temp[i].charAt(1).toUpperCase());
	return str;
	//以下写法标清机顶盒不支持
	/*return str.replace(eval('(/'+flag+'(\\w)/g)'),function(m,$1,idx,str)
	{
		return $1.toUpperCase();
	});*/
};

var curCSS;//模仿jQuery中读取css定义的对象，add by lxa 20140923
if(window.getComputedStyle)//如果是谷歌或火狐
{
	curCSS = function(elem, name) 
	{
		name = Epg.toHump(name,'-');//转驼峰形势
		var ret,
			computed=window.getComputedStyle(elem,null),
			style = elem.style;
		if(computed) 
			ret = computed[name];
		if(!ret)
			ret = style[name];
		return ret;
	};
}
else if(document.documentElement.currentStyle)//如果是IE
{
	curCSS = function(elem, name)
	{
		name = Epg.toHump(name,'-');//转驼峰形势
		var ret = elem.currentStyle&&elem.currentStyle[name],
			style = elem.style;
		if(!ret&&style&&style[name])
		{
			ret=style[name];
		}
		return ret === '' ? 'auto' : ret;
	};
}
else //否则，如果是垃圾机顶盒
{
	curCSS = function(elem,name)
	{
		name = Epg.toHump(name,'-');//转驼峰形势
		var style=elem.style;
		return style[name];
	};
}

/**
 * 检查某个css属性是不是属于包含px的那种
 * add by lxa 20140923
 * 示例一：Epg.isPxCss('left');//返回true
 * 示例二：Epg.isPxCss('opacity');//返回false
 * @param name
 * @returns {Boolean}
 */
Epg.isPxCss = function(name)
{
	var px_css=['left','top','right','bottom','width','height','line-height','font-size'];
	for(var i=0;i<px_css.length;i++)
		if(px_css[i]===name)
			return true;
	return false;
};

/**
 * 读取或修改元素的css属性，注意机顶盒支持的css很有限，请谨慎使用<br>
 * 直接修改或者读取obj.style.xxx时不能读取定义在css中的样式
 * add by lxa 20140923
 * @param obj 要读取或者设置的对象
 * @param name css名称
 * @param value 不传值代表获取，传值表示设置
 * @returns
 */
Epg.css = function(obj, name, value)
{
	if(value === undefined)//获取css属性
	{
		var temp = curCSS(obj, name);
		if(temp!=undefined && (temp==''||temp=='auto'))
			temp = 0;
		return temp;
	}
	else//设置css属性
	{
		value += '';//int转string
		//如果是以px为单位的样式，但又没有传px，主动加上去
		if(this.isPxCss(name) && value.indexOf('px')<0)
			value += 'px';
		obj.style[Epg.toHump(name)] = value;
	}
};

Epg.cssText = function(obj,params) 
{
	for (var it in params) {
		var value=params[it].end+"";
		if (this.isPxCss(it) && value.indexOf("px") < 0) {
			value+= "px"
		}
		obj.style.cssText +=";"+Epg.toHump(it) +":"+ value;
	}
};
/**
 * 动画相关方法，add by lxa 20140923
 */
Epg.fx = 
{
	interval: 13,//动画执行的帧率，意思是多少毫秒执行一次，默认13毫秒，jQuery默认就是这个值
	tagIdx: 0,//用来给timer递增取名字的索引
	animates: {},//存储所有执行过的动画数据，执行完毕后数据会被清空
	/**
	 * 开始一个动画，不兼容标清机顶盒，具体可能表现在：标清setInterval必须使用全局变量，标清的delete有问题，等
	 * @param obj 需要执行动画的对象
	 * @param params 动画参数，obj类型，形如：{left:'200px',top:'300px'}
	 * 				或者：{left:['100px','200px'],top:['50px','300px']}
	 * @param speed 速度，可以是number类型，表示毫秒数，也可以是字符串，如：'fast','normal','slow'
	 * @param easing 动画效果，默认swing
	 * @param callback 动画执行完毕后的回调函数
	 * @param tag 给动画取标签，如果开始一个动画前已经存在一个正在运行的、且标签相同的动画，
	 * 				那么这个动画会被强行停止，并直接变成动画结束时的状态，默认'default'
	 */
	start: function(obj, params, speed, easing, callback, tag)
	{
		var speeds = {fast:200, normal:400, slow:600};//预设的3个速度级别，同jQuery一模一样
		speed = (typeof speed === 'string' ? speeds[speed] : speed) || speeds.normal;
		if(typeof easing === 'function')
		{
			tag = callback;
			callback = easing;
			easing = '';
		}
		easing = easing || 'swing';
		tag = tag || 'default';//默认标签
		
		//遍历正在执行的动画集合，存在相同tag的动画时强行停止
		for(var i in this.animates)			
		{
			if(i.indexOf(tag)>=0)
				this.stop(i);//结束动画
		}
		
		var oldParams = params;//旧的params数据
		params = {};//新的params数据
		var canContinue = false;//标记动画是否能够继续执行下去
		for(var i in oldParams)//处理旧数据
		{
			var p = oldParams[i];
			if(!Epg.isArray(p)) //如果不是数组，强行变成数组
				p = [Epg.css(obj, i), p];//[当前CSS,目标CSS]
			else
				Epg.css(obj, i, p[0]);//p[0]代表起始状态，立即将元素变为起始状态，防止一闪而过的现象
			params[i] = {start: parseFloat(p[0]), end: parseFloat(p[1])};
			if(params[i].start !== params[i].end)
				canContinue = true;
		}
		if(!canContinue) return;//如果params中所有参数起始结束状态都一样，动画就没必要执行下去了
		tag += '_' + (++this.tagIdx);//最终的tag名字
		this.animates[tag] = {obj:obj, params:params, speed:speed, easing:easing, callback:callback, startTime:Date.now(), idx:0, timer:undefined};
		this.animates[tag].timer = setInterval(function()
		{
			var animate = Epg.fx.animates[tag];
			animate.idx++;//动画已经执行的次数，这个参数暂时没用
			var n = Date.now()-animate.startTime;//从开始当现在已经过去的时间
			if( n > animate.speed )
			{
				Epg.fx.stop(tag);//结束动画
				return;
			}
			var percent = n/animate.speed;//根据时间差计算百分比
			var pos = Epg.fx.easing[animate.easing](percent, n, 0, 1, animate.speed);
			for( var i in animate.params )
			{
				var p = animate.params[i];
				Epg.css(animate.obj, i, p.start + (p.end - p.start) * pos);
			}
		}, this.interval);
	},
	/**
	 * 停止某个正在运行的动画
	 * @param tag 保存在Epg.fx.animates中的标签名
	 * @return 是否成功，不过这个貌似不重要
	 */
	stop: function(tag)
	{
		var animate = Epg.fx.animates[tag];
		if(!animate)
			return false;
		clearInterval(animate.timer);//结束正在运行的动画
		var ps = animate.params;
		for(var i in ps)//让对象直接变成动画结束时的状态
			Epg.css(animate.obj, i, ps[i].end);
		Epg.call(animate.callback);//执行回调函数
		delete Epg.fx.animates[tag];//注意直接“delete animate”无效
		return true;
	},
	/**
	 * 模仿jQuery的easing函数，动画效果方法，返回值是当前时刻运动的百分比<br>
	 * 按照常规思路，动画的实现方式是这样的：<br>
	 * 通过setInterval每隔一定时间给某个值增加特定数值，直到这个值达到限制值。这样做的主要问题是，<br>
	 * 不同浏览器的运行速度不同，从而导致动画速度有差异，一般是IE下比较慢，Firefox下比较快。<br>
	 * 而jQuery.animate是以当前时间来决定位移值，某个时刻的位移值总是固定的，因而动画速度不会有差异。<br>
	 * 参考自：http://heeroluo.net/Article/Detail/67
	 */
	easing:
	{
		/**
		 * 匀速线性变化，其实这里有效参数只有一个，那就是p
		 * @param p 运动的时间，其实这里传的值是运动的百分比，即percent
		 * @param n 运动的次数，貌似真正含义是从运动开始到此刻的时间差
		 * @param firstNum 起始值，这里一般默认0
		 * @param diff 速度，这里默认1
		 * @returns
		 */
		linear: function( p, n, firstNum, diff )
		{
			return firstNum + diff * p;//等同于：return p;
		},
		swing: function( p, n, firstNum, diff )
		{
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	},
	/**
	 * add by lxa 20150601
	 * 开始一个动画，不兼容标清机顶盒，具体可能表现在：标清setInterval必须使用全局变量，标清的delete有问题，等
	 * @param obj 需要执行动画的对象
	 * @param params 动画参数，形如：[0, 26]
	 * @param speed 速度，可以是number类型，表示毫秒数，也可以是字符串，如：'fast','normal','slow'
	 * @param easing 动画效果，默认swing
	 * @param callback 动画执行完毕后的回调函数
	 * @param tag 给动画取标签，如果开始一个动画前已经存在一个正在运行的、且标签相同的动画，
	 * 				那么这个动画会被强行停止，并直接变成动画结束时的状态，默认'default'
	 */
	setInterval: function(fn, params, speed, easing, callback, tag)
	{
		var speeds = {fast:200, normal:400, slow:600};//预设的3个速度级别，同jQuery一模一样
		speed = (typeof speed === 'string' ? speeds[speed] : speed) || speeds.normal;
		params = params || [0, 1];
		easing = easing || 'swing';
		tag = tag || 'default';//默认标签
		//遍历正在执行的动画集合，存在相同tag的动画时强行停止
		for(var i in this.animates)
		{
			if(i.indexOf(tag)>=0)
				this.stopInterval(i);//结束动画
		}
		tag += '_' + (++this.tagIdx);//最终的tag名字
		this.animates[tag] = {fn:fn, params:params, speed:speed, easing:easing, callback:callback, startTime:Date.now(), idx:0, timer:undefined};
		this.animates[tag].timer = setInterval(function()
		{
			var animate = Epg.fx.animates[tag];
			animate.idx++;//动画已经执行的次数，这个参数暂时没用
			var n = Date.now()-animate.startTime;//从开始当现在已经过去的时间
			if( n > animate.speed )
			{
				Epg.fx.stopInterval(tag);//结束动画
				return;
			}
			var percent = n/animate.speed;//根据时间差计算百分比
			var pos = Epg.fx.easing[animate.easing](percent, n, 0, 1, animate.speed);//根据easing函数计算出真正的位置
			var value = animate.params[0] + (animate.params[1] - animate.params[0]) * pos;
			Epg.call(animate.fn, value);
		}, this.interval);
	},
	/**
	 * 停止某个正在运行的动画，add by lxa 20150601
	 * @param tag 保存在Epg.fx.animates中的标签名
	 * @return 是否成功，不过这个貌似不重要
	 */
	stopInterval: function(tag)
	{
		var animate = Epg.fx.animates[tag];
		if(!animate)
			return false;
		clearInterval(animate.timer);//结束正在运行的动画
		Epg.call(animate.fn, animate.params[1]);//让对象直接变成动画结束时的状态
		Epg.call(animate.callback);//执行回调函数
		delete Epg.fx.animates[tag];//注意直接“delete animate”无效
		return true;
	}
};

/**
 * Epg.fx.start的快捷调用，add by lxa 20140923
 */
Epg.animate = function(obj, params, speed, easing, callback, tag)
{
	Epg.fx.start(obj, params, speed, easing, callback, tag);
};

/**
 * add by wyy 20150609
 */
Epg.slider = epg.slider =
{
	interval: 13,//动画执行的帧率，意思是多少毫秒执行一次，默认13毫秒，jQuery默认就是这个值
	rate:20,//每个动画执行，动画运行的速度叠加值
	animates: {},//存储对象的相关法属性
	easing :'swing',//取默认 swing的形式
	group:[],//存储对象的数组
	/**
	 * @param objs 对象数组
	 * @param params 动画参数,形如：[{left:'200px',top:'300px',width:'200px'}，{left:'200px',top:'300px',width:'200px'}] 
	 * 							或者 {left:'200px',top:'300px',width:'200px'}
	 * @param speed 速度，可以是number类型，表示毫秒数，也可以是字符串，如：'fast','normal','slow'
	 * @param easing 动画效果，默认swing
	 * @param direction 方向 默认right是自左向右或从上向下,left 是自右向左或自下向上 
	 * @param negative 是左右移动还是上下移动
	 */	
	start:function(objs,params,speed,direction,negative)
	{
		var speeds = {fast:800, normal:1500, slow:2000};//预设的3个速度级别,
		speed = (typeof speed === 'string' ? speeds[speed] : speed) || speeds.normal;
		direction =  direction || 'left'; //列表运行的规律
		negative = negative || 'plus';  // 列表运行的方向
		if(!Epg.isArray(objs))
			objs=[objs];	
		if(!Epg.isArray(params))
			params=[params];//强制将对象转化成数组
		var  oldparams = params;//旧的参数
		var params=[];
		var  targetParam = {}; //用来存储移动的坐标对象
		for(var i in oldparams)
		{
			var param = oldparams[i];
			var start = negative == 'plus' ? parseFloat(param.left)- parseFloat(param.width) : (parseFloat(param.left) + parseFloat(param.width)) , 
				end = parseFloat(param.left);
				param.left = start;
				param.top = param.top;
				targetParam.left= end;
				targetParam.top= param.top;
				speed = speed+i*this.rate;
				epg.slider.move(objs[i],param,targetParam,speed,'');	
		}
	},
	/**
	 * move方法 适合两个对象之间的移动
	 * @objs 需要移动的对象
	 * @initparams 初始化的坐标状态， 传去的都是对象 或者对象数组{left:40,top:50} |[{left:40,top:50}]
	 * @targetparams 目标坐标 传去的都是对象 或者对象数组{left:80,top:100}| [{left:80,top:100}]
	 * @speed 速度，可以是number类型，表示毫秒数，也可以是字符串，如：'fast','normal','slow'
	 * @param easing 动画效果，默认swing
	 */
	move:function(obj,initparams,targetparams,speed,callBack){
		var speeds = {fast:1000, normal:1000, slow:1200};//预设的3个速度级别,
		speed = (typeof speed === 'string' ? speeds[speed] : speed) || speeds.normal;
		speed=speed<100?0.1:speed;
		if( typeof callBack === 'function')
			callBack =callBack;	
		if(initparams == '' || initparams == undefined || initparams == null)
		{
			initparams={};// 没有传值取当前对象的值
			initparams.left=Epg.css(obj,'left');
			initparams.top =Epg.css(obj,'top');
		}
		
		easing =this.easing;
		var params = {};
		for(var i in initparams)
		{
			var start = parseFloat(initparams[i]), end = parseFloat(targetparams[i]);
			params[i]={start:start,end:end};
		}
		this.animates={obj:obj,params:params,startTime:Date.now(),timer:i};
		var target = this.animates;
		target.timer=setInterval(function(){
			var n = Date.now()-target.startTime;
			if( n >speed)
			{
				clearInterval(target.timer);//结束动画
				target.timer = undefined;
				// for(var i in target.params)
				// {
				// 	Epg.css(target.obj,i,target.params[i].end);
				// }
				Epg.cssText(target.obj,target.params);
				this.animates = null;
				Epg.call(callBack);
				return;
			}
			var percent = n/speed;//根据时间差计算百分比
			var pos = Epg.fx.easing[easing](percent, n, 0, 1, speed);
			for( var i in target.params )
			{
				var p = target.params[i];
				Epg.css(target.obj, i, (p.start + (p.end - p.start) * pos));
			}
		},this.interval);
	}
};



/**
 * 判断对象是否具有某个class，仅保证高清盒子支持，标清盒子请勿使用！add by lxa 20150414
 */
Epg.hasClass = function(obj, cls)
{
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
};

/**
 * 给dom对象添加class，仅保证高清盒子支持，标清盒子请勿使用！add by lxa 20150414
 */
Epg.addClass = function(obj, cls)
{
	if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
};

/**
 * 给对象删除class，仅保证高清盒子支持，标清盒子请勿使用！add by lxa 20150414
 */
Epg.removeClass = function(obj, cls)
{
	if (this.hasClass(obj, cls)) obj.className = obj.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' ');
};

/**
 * 播放按键声音，目前仅安卓支持，add by lxa 20150506
 * @param sound 按键声音名字，不知道传什么可以传default，所有可选的声音请参看对应的安卓项目
 */
Epg.playKeySound = function(sound)
{
	if(is_ott && sound)
	{
		//可以在这里设置默认的按键声音
		sound = (sound==='default') ? 'defaultClick' : sound;
		sound = (sound==='defaultClick') ? 'type.wav' : sound;//默认click
		sound = (sound==='defaultMove') ? 'biu.wav' : sound;//默认move
		try{android.playKeySound(sound);}catch(e){}
	}
};


/**
 * 触发按键事件，兼容IE、谷歌、火狐等常见浏览器，尚未在所有标清盒子测试，故仅限高清盒子调用，add by lxa 20150515
 * @param obj 事件对象，一般传document
 * @param eventType 事件类型，支持 keydown和keypress
 * @param keyCode 要触发的按键值，数字类型
 * @param keyCode2 适配OTT数字键，fireKeyEvent方法返回3个或4个参数
 */
Epg.fireKeyEvent = function(obj, eventType, keyCode,keyCode2)
{
	//add by hucp 2016-08-22
	//apk未处理键值，第三个参数返回EVENT_OTT_KEY，第四个参数返回keyCode
	if(keyCode === 'EVENT_OTT_KEY')
	{
		keyCode = keyCode2;
	}
	
	//针对最近发现的部分盒子不支持Epg.fireKeyEvent()方法，现在改为主动调用Epg.eventHandler，update by lxa 20150609
	if(keyCode === 'EVENT_MEDIA_END' || keyCode === 'EVENT_MEDIA_ERROR' || keyCode === 'EVENT_MEDIA_START')
	{
		if(typeof menuWindow === 'undefined' && Epg.eventHandler)
			Epg.eventHandler(keyCode);
		else if(menuWindow && menuWindow.Epg.eventHandler)
			menuWindow.Epg.eventHandler(keyCode);
		return;
	}
	
	var event;
	if(document.createEvent)//如果是Chrome、Opera、Safari、Firefox
	{
		if(window.KeyEvent)//如果是Firefox
		{
			event = document.createEvent('KeyEvents');
			event.initKeyEvent(eventType, true, true, window, false, false, false, false, keyCode, 0);
		}
		else//如果是Chrome、Opera、Safari
		{
			event = document.createEvent('UIEvents');
			event.initUIEvent(eventType, true, true, window, 1);
			delete event.keyCode;
			if(typeof event.keyCode === "undefined")//如果是Chrome、Opera
				Object.defineProperty(event, "keyCode", {value:keyCode});
			else//如果是Safari
				event.key = String.fromCharCode(keyCode);
		}
		obj.dispatchEvent(event);
	}
	else if(document.createEventObject)//如果是IE
	{
		event = document.createEventObject();
		event.keyCode = keyCode;
		obj.fireEvent('on'+eventType, event);
	}
};

/**
 * 绑定事件，add by lxa 20150603
 * @param obj 事件对象，一般传document
 * @param event 事件名，支持空格分隔多个事件
 * @param fn 方法
 */
Epg.on = function(obj, event, fn)
{
	var events = event.split(' ');
	for(var i in events)
		obj.addEventListener(events[i], fn, false);
};

/**
 * 取消事件，add by lxa 20150603
 * @param obj 事件对象，一般传document
 * @param event 事件名，支持空格分隔多个事件
 * @param fn 方法
 */
Epg.off = function(obj, event, fn)
{
	var events = event.split(' ');
	for(var i in events)
		obj.removeEventListener(events[i], fn);
};

/**
 * 临时绑定事件，执行一次后立即销毁，add by lxa 20150603
 * @param obj 事件对象，一般传document
 * @param event 事件名，支持空格分隔多个事件
 * @param fn 方法
 */
Epg.one = function(obj, event, fn)
{
	var tempFn = function()
	{
		fn();
		Epg.off(obj, event, tempFn);
	};
	Epg.on(obj, event, tempFn);
};


/**
 * 电脑上播放视频的方法，可以播放MP3也可以播放视频，不算正式代码，add by lxa 20150606
 */
(function()
{
	if(!debug_mode) return;//正式上线后这段代码失效
	//电脑上的MP对象
	var PCMP =
	{
		//必须在body之后调用本方法
		init: function()
		{
			if(!mp)
			{
				mp = document.createElement('video');
				mp.controls = false;//不显示浏览器自带控制条
				mp.autoplay = true;//自动播放
				document.body.insertBefore(mp, document.body.firstElementChild);
				
				//监听audio的播放结束事件，模拟EPG上面的EVENT_MEDIA_END
				mp.addEventListener('start', function(e){Epg.fireKeyEvent((typeof menuWindow==='undefined')?document:menuWindow.document, 'keydown', 'EVENT_MEDIA_START');});
				mp.addEventListener('ended', function(e){Epg.fireKeyEvent((typeof menuWindow==='undefined')?document:menuWindow.document, 'keydown', 'EVENT_MEDIA_END');});
				mp.addEventListener('error', function(e){Epg.fireKeyEvent((typeof menuWindow==='undefined')?document:menuWindow.document, 'keydown', 'EVENT_MEDIA_ERROR');});
			}
		},
		
		/** 全屏播放 */
		fullscreenPlay: function(url)
		{
			this.smallvodPlay(url, 0, 0, 1280, 720);//这里暂时不管标清项目
		},
		
		/** 小视频播放 */
		smallvodPlay: function(url, left, top, width, height)
		{
			mp.left = left;
			mp.top = top;
			mp.width = width;
			mp.height = height;
			mp.src = url;
		},
		
		/** 从暂停、快进、快退中恢复 */
		resume: function(callback)
		{
			this.speed = 1;
			this.state = 'play';
			if(this.defaultTip) Epg.ykqTip("播放");
			mp.play();
			Epg.call(callback, [this]);
		},
		
		/** 定点播放 */
		playByTime: function(second)
		{
			mp.currentTime = second;
		},
		
		//获取当前播放时间，以前没有的方法
		getCurrentPlayTime: function()
		{
			return Math.round(mp.currentTime || 0);
		},
		
		//获取总时长，以前没有的方法
		getMediaDuration: function()
		{
			return Math.round(mp.duration || 0);//还没加载时此值为NaN
		},

		//销毁播放器
		destroy: function()
		{
			mp.pause();//暂停可能会有一些问题，暂时不管了，反正不是正式代码
		}
	};
	
	//如果是电脑（简单判断），将播放器换成HTML5的Audio标签，上线后debug_mode改为false这段代码就不会生效了
	if(navigator.userAgent.toLowerCase().indexOf('windows nt 6.3;')>=0)
	{
		for(var i in PCMP)
			Epg.Mp[i] = PCMP[i];
	}
})();




/**
 * 聚焦时醒目提示功能
 * @param id 图片img的id
 * @param 
 */
Epg.remind = (function(){
	 var instantiated;
	 var __left = 0,
		 __top = 0,
		 __width = 0,
		 __height = 0,
		 __zIndex = 0;
	    function init() {
	        /*这里定义单例代码*/
	        return {
	            focus: function (id,size) {
	                
	             	var __thisImgId = id;
	             	var __thisImg = document.getElementById(__thisImgId);
	             	/*这里根据img的id来获取外围的父节点(一般为DIV)*/
	             	var __parent = __thisImg.parentNode;
	            	
	             	/*先根据图片的ID获取width 与 top 与 z-index;*/
	             	__width = __thisImg.width;
	             	__height = __thisImg.height; 
	             	__zIndex = __thisImg.style.zIndex;
	            	
	             	var __overflow = __parent.style.overflow;
	             	if(__overflow==='' || __overflow.length==0){ //判断DIV的overflow属性,如果没有的话,加上overflow=hidden;
	             		__parent.style.overflow = "hidden";
	             	}
	            	
	             	/*根据拿到到的父节点div来获取left 与 top*/
	             	__left = __parent.style.left;
	             	__top = __parent.style.top;
	             	__left = __left.replace('px','');
	             	__top = __top.replace('px','');
	             	
	             	/* 修改div的 left,top,width,height (width与height是为了保险起见,)*/
	             	__parent.style.zIndex  = 1000;
	             	__parent.style.left = parseInt(__left) - size + 'px';
	             	__parent.style.top =  parseInt(__top) - size + 'px';
	             	__parent.style.width =  parseInt(__width) + 2*size + 'px';
	             	__parent.style.height =  parseInt(__height) + 2*size + 'px';
	            	
	             	/* 修改img的 width,height*/
	             	__thisImg.width = parseInt(__width)+ 2*size ;
	             	__thisImg.height = parseInt(__height)+ 2*size;	
	                
	            },
	            blur: function (id) {
	            	var __thisImgId = id;
	             	var __thisImg = document.getElementById(__thisImgId);
	             	/*这里根据img的id来获取外围的父节点(一般为DIV)*/
	             	var __parent = __thisImg.parentNode;
	             	
	             	__parent.style.zIndex  = __zIndex;
	             	__parent.style.left = __left+'px';
	             	__parent.style.top = __top+'px';
	             	__parent.style.width = __width+'px';
	             	__parent.style.height = __height+'px';
	            	
	            	__thisImg.width = __width;
	            	__thisImg.height = __height;
	            }
	        };
	    }
	    return {
	        getInstance: function () {
	            if (!instantiated) {
	                instantiated = init();
	            }
	            return instantiated;
	        }
	    };
})();


/** 
 * 新增加验证功能 
 *  add wyy 20151029
 **/
Epg.validate=
{
	/**
	 * phone 验证电话 包括手机和固话
	 * param  number 输入的号码 ,fixed 是否验证固话 值为：true or false,默认false
	 *  
	 * */
	phone:function(number,fixed)
	{
		var target = this;
		if(fixed)
			target.reg = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})?$|(^(13[0-9]|15[0|3|5|6|7|8|9]|18[0|5|6|8|9|]|17[0-9])\d{8}$)/;
		else
			target.reg = /^(13[0-9]|15[0|3|5|6|7|8|9]|18[0|5|6|8|9|]|17[0-9])\d{8}$/;
		 
		return target.reg.test(number);
	}
}

/**
 *  Epg.date 对时间格式化 
 *  function : format 用户格式化时间 param :  date 时间类型 不传默认是当前系统时间 strformat 是转化格式，不传默认取 第一个格式
 *  add by wyy 20151204
 */
Epg.date=
{
	/**
	 * 定义一些常用的日期格式 
	 */
	types:{ 
			DEFAULT_DATE_FORMAT:'yyyy-MM-dd', 
			DEFAULT_MONTH_FORMAT: 'yyyy-MM',
			DEFAULT_YEAR_FORMAT: 'yyyy',
			DEFAULT_TIME_FORMAT: 'HH:mm:ss',
			DEFAULT_DATETIME_FORMAT: 'yyyy-MM-dd HH:mm:ss',
			DEFAULT_YEAR: 'YEAR',
			DEFAULT_MONTH: 'MONTH',
		    DEFAULT_DATE: 'DATE',
		  },	
	formate:function(date,strformat)//转化格式方法
	{
		try {
			strformat = strformat || this.types.DEFAULT_DATE_FORMAT ;//没有传入取默认转化格式
			if(typeof date === 'undefined')
			{
				this.curDate = new Date();
			}
			else if(!(date instanceof Date))
			{
				console.info("请输入正确的日期的格式")
				return;
			}
			else if(date instanceof Date)
				this.curDate = date;
			
			var dates = this.getDateObject(this.curDate); 
			if(/(y+)/.test(strformat)){  
	            var fullYear = this.curDate.getFullYear() + "";  
	            var year = RegExp.$1.length == 4? fullYear: fullYear.substr(4 - RegExp.$1.length);  
	            strformat = strformat.replace(RegExp.$1, year);  
	         }  
	         for(var i in dates){  
	            if(new RegExp("(" + i + ")").test(strformat)){  
	               var target = RegExp.$1.length == 1? dates[i]: ("0" + dates[i]).substr(("" + dates[i]).length - 1);  
	               strformat = strformat.replace(RegExp.$1, target);  
	            }  
	         }  
	         return strformat;	
		}catch(e)
		{
			console.info("转化时间异常");
		}
	},
	getDateObject: function(date){  
        return {  
            "M+" : date.getMonth() + 1,   
            "d+" : date.getDate(),     
            "H+" : date.getHours(),     
            "m+" : date.getMinutes(),   
            "s+" : date.getSeconds()  
         };  
    },  
}

/**
 * 获取订购,续订,订购打折相关参数
 * @param source 订购来源
 * @param targetType 跳转类型
 * @param code 订购编码
 * @param renewal 是否续订
 * @param ds   打折参数 如：DS_ACTIVITY_MONTH
 * @contiuneType 自动续订  value : auto || stop 
 */
 function getOrderParam(orderType,renewal,contiuneType,ds,code,source,targetType)
 {
	 //订购打折加密秘钥
	  var secretKey = '<%=SECRET_KEY%>';
	  var sign;
	  
	  var json = 
	  {
			"orderType" : ""+orderType,
			"pageName"  : ""+source,
			"pageType"  : ""+targetType,
			"videoCode" : ""+code,
			"appVersion": ""+Epg.cookie.get('APP_VERSION'),
			"epgVersion": ""+Epg.cookie.get('CHANNEL_CODE'),
			"apkVersion": ""+Epg.cookie.get('VERSION'),
			"city": ""+Epg.cookie.get('city'),
			"ip": ""+Epg.cookie.get('IP')
	   };
	  
	   if(renewal != 'undefined' && renewal != '')
	  {
		  json['renewal'] =  ""+renewal;
	  }
	   if(ds != 'undefined' && ds != '')
	  {
		  sign =  $.md5(Epg.cookie.get('userid')+secretKey+ds+secretKey).toLowerCase();
		  json['ds'] = ""+ds;
	  }
   	  if( sign != 'undefined' && sign != '')
	  {
		  json['sign'] = ""+sign;
	  }
   	  if( contiuneType != 'undefined' && contiuneType !='')
   	  {
   		json['contiuneType'] = ""+contiuneType;
   	  }
	 return JSON.stringify(json);
 }
/**
 * 通过百度地图API获取当前用户的地理位置 将获取到的城市 存入到客户端
 */
Epg.map=
{
	/** 获取当前浏览器所在的城市*/
	init:function()
	{
		var geolocation = new BMap.Geolocation();    
		var gc = new BMap.Geocoder(); 
			geolocation.getCurrentPosition( function(r) {   //定位结果对象会传递给r变量  
	        if(this.getStatus() == BMAP_STATUS_SUCCESS)  
	        {   
	            var pt = r.point;    
	            gc.getLocation(pt, function(rs){    
	                var addComp = rs.addressComponents;    
	                Epg.map.weather(addComp.city);
	            });  
	        } 
		});
	},
	weather:function(city)
	{
		Epg.ajax({
			url:'com/ajax.jsp?',
			data:{'method':'getWeather','city':city},
			type:'POST',
			dataType:'json',
			success:function(status,msg)
			{
				var pm = msg.results[0].pm25;
				var temperature = msg.results[0].weather_data[0].temperature;
				var weather =  msg.results[0].weather_data[0].weather;
				Epg.cookie.set("weather",escape(city+"&nbsp;"+weather+"&nbsp;"+temperature+"&nbsp;PM2.5浓度:"+pm),1);//默认存一天
			}
		});
	}	
}