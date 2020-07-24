

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



#### Event loop

微任务包括 `process.nextTick` ，`promise` ，`MutationObserver`

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

事件循环的顺序，决定js代码的执行顺序。进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。

```js
setTimeout(function() {
    console.log('setTimeout');
})

new Promise(function(resolve) {
    console.log('promise');
}).then(function() {
    console.log('then');
})

console.log('console');
```

这段代码作为宏任务，进入主线程。
先遇到`setTimeout`，那么将其回调函数注册后分发到宏任务Event Queue。
接下来遇到了`Promise`，`new Promise`立即执行，`then`函数分发到微任务Event Queue。
遇到`console.log()`，立即执行。
好啦，整体代码script作为第一个宏任务执行结束，看看有哪些微任务？我们发现了`then`在微任务Event Queue里面，执行。
ok，第一轮事件循环结束了，我们开始第二轮循环，当然要从宏任务Event Queue开始。我们发现了宏任务Event Queue中`setTimeout`对应的回调函数，立即执行。
结束。

#### JavaScript 中的执行上下文和执行栈

 执行上下文是当前 JavaScript 代码被解析和执行时所在环境的抽象概念。 

#### 执行上下文的类型

执行上下文总共有三种类型

- **全局执行上下文**：只有一个，浏览器中的全局对象就是 window 对象，`this` 指向这个全局对象。
- **函数执行上下文**：存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文。
- **Eval 函数执行上下文**： 指的是运行在 `eval` 函数中的代码，很少用而且不建议使用。

#### 执行栈

执行栈，也叫调用栈，具有 LIFO（后进先出）结构，用于存储在代码执行期间创建的所有执行上下文。
首次运行JS代码时，会创建一个**全局**执行上下文并Push到当前的执行栈中。每当发生函数调用，引擎都会为该函数创建一个**新的函数**执行上下文并Push到当前执行栈的栈顶。根据执行栈LIFO规则，当栈顶函数运行完成后，其对应的**函数**执行上下文将会从执行栈中Pop出，上下文控制权将移到当前执行栈的**下一个**执行上下文。

#### javascript的执行和运行

执行和运行有很大的区别，javascript在不同的环境下，比如node，浏览器，Ringo等等，执行方式是不同的。而运行大多指javascript解析引擎，是统一的。

### 作用域

作用域是指程序源代码中定义变量的区域。
作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。
JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域, 函数的作用域在函数定义的时候就决定了。
函数的作用域基于函数创建的位置

```js
var value = 1;
function foo() {
    console.log(value);
}
function bar() {
    var value = 2;
    foo();
}
bar();
```

执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，
如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

### 执行上下文

每个执行上下文，都有三个重要属性：

1. 变量对象(Variable object，VO)

2. 作用域链(Scope chain)

3. this


执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：进入执行上下文  代码执行

在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
在代码执行阶段，会再次修改变量对象的属性值

作用域即函数或变量的可见区域。
执行上下文就是当前 JavaScript 代码被解析和执行时所在的环境，也叫作执行环境。
执行上下文的生命周期包括三个阶段：创建阶段 → 执行阶段 → 回收阶段，本文重点介绍创建阶段。
执行上下文的生命周期

执行上下文的生命周期包括三个阶段：创建阶段 → 执行阶段 → 回收阶段，本文重点介绍创建阶段。
a. 创建阶段
当函数被调用，但未执行任何其内部代码之前，会做以下三件事：

创建变量对象：首先初始化函数的参数 arguments，提升函数声明和变量声明（变量的声明提前有赖于var关键字）。
创建作用域链：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。作用域链本身包含变量对象。作用域链用于解析变量。当被要求解析变量时，JavaScript 始终从代码嵌套的最内层开始，如果最内层没有找到变量，就会跳转到上一层父作用域中查找，直到找到该变量。
确定 this 指向。
b. 执行阶段
创建完成之后，就会开始执行代码，在这个阶段，会完成变量赋值、函数引用、以及执行其他代码。

c. 回收阶段
函数调用完毕后，函数出栈，对应的执行上下文也出栈，等待垃圾回收器回收执行上下文。

变量对象（VO）是一个类似于容器的对象，与作用域链、执行上下文息息相关。

变量对象的创建过程的三条规则：
1.建立arguments对象。检查当前执行上下文中的参数，建立该对象下的属性与属性值。
2.检查当前执行上下文的函数声明，也就是使用function关键字声明的函数。在变量对象中以函数名建立一个属性，属性值为指向该函数所在内存地址的引用。如果该属性之前已经存在，那么该属性将会被新的引用所覆盖。

3.检查当前执行上下文中的变量声明，每找到一个变量声明，就在变量对象中以变量名建立一个属性，属性值为undefined。
如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被修改。

当执行上下文进入执行阶段后，变量对象会变为活动对象（Active Object，AO）。此时原先声明的变量会被赋值。变量对象和活动对象都是指同一个对象，只是处于执行上下文的不同阶段。

函数执行阶段（也即执行上下文的执行阶段）会获取this属性的值，此时this就是一个变量，储存着调用该函数的对象的值。

使用`new` 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

1. 创建（或者说构造）一个全新的对象；
2. 将构造函数的作用域赋给新对象（因此`this`就指向了这个新对象）；
3. 执行构造函数中的代码（为这个新对象添加属性、方法等）；
4. 如果函数没有返回其他对象，那么返回这个新对象。

 **同步和异步其实指的是，请求发起方对消息结果的获取是主动发起的，还是等被动通知的。** 

### 原型

![prototype](..\org\prototype.png)

##### 原型和原型链    

1. 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（null除外）
2. 所有的引用类型（数组、对象、函数），都有一个__proto__属性（隐式原型），属性值是一个普通的对象
3. 所有的函数，都有一个prototype属性，属性值也是一个普通的对象
4. 所有的引用类型（数组、对象、函数），__proto__属性值指向它的构造函数的prototype属性值。即：fn.__proto__ === Fn.prototype 
5. Function也是一个函数，函数是一种对象，也有__proto__属性。既然是函数，那么它一定是被Function创建。所以——Function是被自身创建的。所以它的__proto__指向了自身的Prototype。 

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



### 序列化

序列化的作用是存储和传输：
	存储(对象本身存储的只是一个地址映射，如果断电，对象将不复存在，因此需将对象的内容转换成字符串的形式再保存在磁盘上)
	传输（例如 如果请求的Content-Type是 application/x-www-form-urlencoded，则前端这边需要使用qs.stringify(data)来序列化参数再传给后端，否则后端接受不到；ps:  Content-Type 为 application/json;charset=UTF-8或者 multipart/form-data 则可以不需要）

### 存储

| **存储方式** | cookie | localStorage | sessionStorage | IndexedDB  | webSQL | FileSystem |
| :----------- | :----- | :----------- | :------------- | :--------- | :----- | :--------- |
| **类型**     |        | key-value    | key-value      | NoSQL      | SQL    |            |
| **数据格式** | string | string       | string         | object     |        |            |
| **容量**     | 4k     | 5M           | 5M             | 500M       | 60M    |            |
| **进程**     | 同步   | 同步         | 同步           | 异步       | 异步   |            |
| **检索**     |        | key          | key            | key, index | field  |            |
| **性能**     |        | 读快写慢     |                | 读慢写快   |        |            |



```js
class Promise{
    constructor(executor){
      this.state = 'pending';
      this.value = undefined;
      this.reason = undefined;
      // 成功存放的数组
      this.onResolvedCallbacks = [];
      // 失败存放法数组
      this.onRejectedCallbacks = [];
      let resolve = value => {
        if (this.state === 'pending') {
          this.state = 'fulfilled';
          this.value = value;
          // 一旦resolve执行，调用成功数组的函数
          this.onResolvedCallbacks.forEach(fn=>fn());
        }
      };
      let reject = reason => {
        if (this.state === 'pending') {
          this.state = 'rejected';
          this.reason = reason;
          // 一旦reject执行，调用失败数组的函数
          this.onRejectedCallbacks.forEach(fn=>fn());
        }
      };
      try{
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }
    then(onFulfilled,onRejected) {
      if (this.state === 'fulfilled') {
        onFulfilled(this.value);
      };
      if (this.state === 'rejected') {
        onRejected(this.reason);
      };
      // 当状态state为pending时
      if (this.state === 'pending') {
        // onFulfilled传入到成功数组
        this.onResolvedCallbacks.push(()=>{
          onFulfilled(this.value);
        })
        // onRejected传入到失败数组
        this.onRejectedCallbacks.push(()=>{
          onRejected(this.value);
        })
      }
    }
  }

usePromise=new Promise(function(resolve){
    console.log("in Promise")
    resolve("Promise resolve")
}).then(
    function(){
        console.log("Promise then")
    }  
)
console.log("out")
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

```js
class Dep {
    constructor () {
        this.subs = [];
    }
    addSub (sub) {
        this.subs.push(sub);
    }
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

class Watcher {
    constructor () {
        Dep.target = this;
    }
    update () {
        console.log("视图更新啦～");
    }
}

function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function defineReactive (obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            dep.addSub(Dep.target);
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        console.log('render~', this._data.test);
    }
}

let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello,test.";

Dep.target = null;
```

