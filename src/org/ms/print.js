function deepClone(data) {
    // const toString = Object.prototype.toString.call(obj);
    const type = this.judgeType(data);
    let obj;
    if (type === 'array') {
      obj = [];
    } else if (type === 'object') {
      obj = {};
    } else { 
      return data;// 不再具有下一层次
    }
    if (type === 'array') {
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]));
      }
    } else if (type === 'object') {
      for (const key in data) {
        obj[key] = this.deepClone(data[key]);
      }
    }
    return obj;
}
Function.prototype.myApply = function(context, args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
    context = context || window
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}
//就是返回一个函数,里面执行了apply上述的操作而已.
//不过有一个需要判断的点, 因为返回新的函数, 要考虑到使用new去调用, 并且new的优先级比较高, 所以需要判断new的调用, 
//还有一个特点就是bind调用的时候可以传参, 调用之后生成的新的函数也可以传参,
Function.prototype.myBind = function (context, ...args) {
    const fn = this
    args = args ? args : []
    return function newFn(...newFnArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArgs)
        }
        return fn.apply(context, [...args,...newFnArgs])
    }
}

let arr = [1, 2, 2, 3];
let newArr = Array.from(new Set(arr));
function distinct(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }

    return result
}

Array.prototype.slice.call(arrayLike); 

// 寄生组合式继承的核心方法 
// GithubUser.call(this, username, password) // 继承属性
// 实现原型上的方法
function inherit(child, parent) {
    // 继承父类的原型
    const p = Object.create(parent.prototype)
    // 重写子类的原型
    child.prototype = p
    // 重写被污染的子类的constructor
    p.constructor = child
}

var shoeObj = {}; // 定义发布者
shoeObj.list = []; // 缓存列表 存放订阅者回调函数
        
// 增加订阅者
shoeObj.listen = function(key,fn) {
    if(!this.list[key]) {
        // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.list[key] = []; 
    }
    this.list[key].push(fn);  // 订阅消息添加到缓存列表
}

// 发布消息
shoeObj.trigger = function(){
    var key = Array.prototype.shift.call(arguments); // 取出消息类型名称
    var fns = this.list[key];  // 取出该消息对应的回调函数的集合

    // 如果没有订阅过该消息的话，则返回
    if(!fns || fns.length === 0) {
        return;
    }
    for(var i = 0,fn; fn = fns[i++]; ) {
        fn.apply(this,arguments); // arguments 是发布消息时附送的参数
    }
};

// 小红订阅如下消息
shoeObj.listen('red',function(size){
    console.log("尺码是："+size);  
});

// 小花订阅如下消息
shoeObj.listen('block',function(size){
    console.log("再次打印尺码是："+size); 
});
shoeObj.trigger("red",40);
shoeObj.trigger("block", 42);
Object.defineProperty() 
我们会通过实现以下 4 个步骤，来实现数据的双向绑定：
1、实现一个监听器 Observer ，用来劫持并监听所有属性，如果属性发生变化，就通知订阅者；
2、实现一个订阅器 Dep，用来收集订阅者，对监听器 Observer 和 订阅者 Watcher 进行统一管理；
3、实现一个订阅者 Watcher，可以收到属性的变化通知并执行相应的方法，从而更新视图；
4、实现一个解析器 Compile，可以解析每个节点的相关指令，对模板数据和订阅器进行初始化
.双向绑定
1.监听器 Observer
/**
  * 循环遍历数据对象的每个属性
  */
function observable(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key])
    })
    return obj;
}
/**
 * 将对象的属性用 Object.defineProperty() 进行设置
 */
function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        get() {
            console.log(`${key}属性被读取了...`);
            return val;
        },
        set(newVal) {
            console.log(`${key}属性被修改了...`);
            val = newVal;
        }
    })
}
2.订阅器 Dep
发布 —订阅设计模式 即观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态改变时，所有依赖于它的对象都将得到通知。
//消息订阅器 Dep:
function Dep () {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
Dep.target = null;
//有了订阅器，我们再将 defineReactive 函数进行改造一下，向其植入订阅器：
defineReactive: function(data, key, val) {
	var dep = new Dep();
	Object.defineProperty(data, key, {
		enumerable: true,
		configurable: true,
		get: function getter () {
			if (Dep.target) {
				dep.addSub(Dep.target);
			}
			return val;
		},
		set: function setter (newVal) {
			if (newVal === val) {
				return;
			}
			val = newVal;
			dep.notify();
		}
	});
}