

### array

改变自身值的方法一共有9个，分别为pop、push、reverse、shift、sort、splice、unshift，copyWithin 和 fill
单个元素操作于数组的都会改变数组，还有排序反转与胶接

不会改变自身的方法一共有9个，分别为concat、join、slice、toString、toLocateString、indexOf、lastIndexOf、未标准的toSource以及ES7新增的方法includes。
字符串的方法都不会改变自身，所以字符串和数组共有的方法也不会改变数组自身
查找和遍历的不改变数组，还有两个数组操作（concat）获片（slice）和字符化

所有插入元素的方法, 比如 push、unshift，一律返回数组新的长度；
所有删除元素的方法，比如 pop、shift、splice 一律返回删除的元素，或者返回删除的多个元素组成的数组；
部分遍历方法，比如 forEach、every、some、filter、map、find、findIndex，它们都包含function(value,index,array){} 和 thisArg 这样两个形参。
Array.prototype 的所有方法均具有鸭式辨型这种神奇的特性。它们不止可以用来处理数组对象，还可以处理类数组对象。

array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
返回值:由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

arr.slice([begin[, end]])
返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

```js
//将arguments转换为一个真正的Array：
var args = Array.prototype.slice.call(arguments);
```

```js
//判断一个值是否数组
var a = [];
// 1.基于instanceof
a instanceof Array;
// 2.基于constructor
a.constructor === Array;
// 3.基于Object.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(a);
// 4.基于getPrototypeOf
Object.getPrototypeOf(a) === Array.prototype;
// 5.基于Object.prototype.toString
Object.prototype.toString.apply(a) === '[object Array]';
// 6.Array.isArray()

```

```js
// 深拷贝 
obj1 = { a: 0, b: { c: 0 } };
let obj3 = JSON.parse(JSON.stringify(obj1));
```

```js
// 深拷贝
function deepClone(obj) {
    if (!obj && typeof obj !== 'object') {
        return;
    }
    var newObj = toString.call(obj) === '[object Array]' ? [] : {};
    for (var key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            newObj[key] = deepClone(obj[key]);
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```



```js
class Point {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  toString(){
     return '('+this.x+','+this.y+')';
  }
  //类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法   //不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
  static classMethod() {
    return 'hello';
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

继承

```js
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'

//使用混入的方式，继承多个对象
function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function () {
  // do a thing
};

```

模拟实现create

```js
//Object.create(proto[, propertiesObject])
//创建一个新对象，使用现有的对象来提供新对象的__proto__。
//极简Polyfill
function likeCreate(proto) {
  function F() { }
  F.prototype = proto;
  return new F();
};
```

模拟实现new

```js
// 构造函数
let Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};
//自己定义的new方法
let newMethod = function (Parent, ...rest) {
    // 1.以构造器的prototype属性为原型，创建新对象；
    let child = Object.create(Parent.prototype);
    // 2.将this和调用参数传给构造器执行
    Parent.apply(child, rest);
    // 3.返回第一步的对象
    return child;
};
//创建实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent, 'echo', 26);
child.sayName() //'echo';

//最后检验，与使用new的效果相同
child instanceof Parent//true
child.hasOwnProperty('name')//true
child.hasOwnProperty('age')//true
child.hasOwnProperty('sayName')//false
```



```js
// this的指向大致可以分为五种.
// this 动态绑定   箭头函数的this指向是静态的,声明的时候就确定了下来.符合js的词法作用域
// 1. 默认绑定   默认绑定一般发生在回调函数,函数直接调用;
// 2. 隐式绑定   谁调用就是指向谁
// 3. 显示绑定   call,apply,bind
// 4. new绑定
// 5. es6的箭头函数 es6的箭头函数比较特殊,箭头函数this为父作用域的this，不是调用时的this.
//    要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的this指向是静态的,声明的时候就确定了下来.符合js的词法作用域
Function.prototype.myApply = function (context, args) {
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
```

```js
// 防抖和节流
// 防抖和节流是在时间轴上控制函数的执行次数。防抖可以类比为电梯不断上乘客,节流可以看做幻灯片限制频率播放电影。
// https://juejin.im/post/5a35ed25f265da431d3cc1b1#heading-10

// 防抖就是先清延时，再重建延时
/**
 * @desc 防抖函数(立即执行就像技能读条，非立即执行就像乘电梯)
 * @param {需要防抖的函数} func
 * @param {延迟时间} wait
 * @param {是否立即执行} immediate
 */
function debounce(func, wait, immediate) {
    let timeout = null
    return function (...args) {
      let context = this
      if (timeout) clearTimeout(timeout)
      if (!timeout) {
        func.apply(context, args)
      }
      if (immediate) {
        timeout = setTimeout(function () {
          timeout = null
        }, wait)
  
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait)
      }
    }
  }
  var fn = function () {
    console.log('boom')
  }
  
  // setInterval(debounce(fn,500),1000) // 第一次在1500ms后触发，之后每1000ms触发一次
  // setInterval(debounce(fn,2000),1000) // 不会触发一次（我把函数防抖看出技能读条，如果读条没完成就用技能，便会失败而且重新读条）
  
  /**
   * @desc 节流
   * @param {需要节流的函数} fn
   * @param {间隔时间} wait
   * @param {是否立即执行} immediate
   */
  function throttle(fn, gapTime) {
    let _lastTime = null;
  
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn();
        _lastTime = _nowTime
      }
    }
  }
  
  let fn2 = ()=>{
    console.log('boom')
  }
  
  setInterval(throttle(fn2,1000),10)
  
```



