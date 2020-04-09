//Object.assign(target, ...sources) 
//将所有可枚举属性的值从一个或多个源对象复制到目标对象。返回目标对象。

//深浅拷贝问题
let obj1 = { a: 0, b: { c: 0 } };
let obj2 = Object.assign({}, obj1);
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}} 

obj2.a = 2;
console.log(JSON.stringify(obj1)); // { a: 0, b: { c: 0}} 
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}

obj2.b.c = 3;
console.log(JSON.stringify(obj1)); // { a: 0, b: { c: 3}} 
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}

// Deep Clone 
obj1 = { a: 0, b: { c: 0 } };
let obj3 = JSON.parse(JSON.stringify(obj1));
obj1.a = 4;
obj1.b.c = 4;
console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}   


//Object.create(proto[, propertiesObject])
//创建一个新对象，使用现有的对象来提供新对象的__proto__。
//极简Polyfill
function likeCreate(proto) {
  function F() { }
  F.prototype = proto;
  return new F();
};


//用 Object.create实现类式继承
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


//Object.defineProperties(obj, props)
//在一个对象上定义新的属性或修改现有属性，并返回该对象。

// props
// 属性描述符对象。对象中存在的属性描述符主要有两种：数据描述符和访问器描述符。描述符具有以下键：
// configurable
// true 当且仅当该属性描述符的类型可以被改变并且该属性可以从对应对象中删除。
// 默认为 false
// enumerable
// true 当且仅当在枚举相应对象上的属性时该属性显现。
// 默认为 false
// value
// 与属性关联的值。可以是任何有效的JavaScript值（数字，对象，函数等）。
// 默认为 undefined.
// writable
// true当且仅当与该属性相关联的值可以用assignment operator改变时。
// 默认为 false
// get
// 作为该属性的 getter 函数，如果没有 getter 则为undefined。函数返回值将被用作属性的值。
// 默认为 undefined
// set
// 作为属性的 setter 函数，如果没有 setter 则为undefined。函数将仅接受参数赋值给该属性的新值。
// 默认为 undefined
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
});


//Object.defineProperty(obj, prop, descriptor)
//在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

//Object.values(obj)
//返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。

var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']


//Object.keys(obj)
//返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。

// simple array
var arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// array like object
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// array like object with random key ordering
var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

//Object.entries(obj)
//返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]


//Object.fromEntries(iterable);
//把键值对列表转换为一个对象。

//Map 转化为 Object
const map = new Map([['foo', 'bar'], ['baz', 42]]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }

//Array 转化为 Object
const arr = [['0', 'a'], ['1', 'b'], ['2', 'c']];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }


//Object.getPrototypeOf(object)
//返回指定对象的原型（内部[[Prototype]]属性的值）

var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true


//Object.is(value1, value2);
//判断两个值是否是相同的值

// Object.is() 判断两个值是否相同。如果下列任何一项成立，则两个值相同：
// 两个值都是 undefined
// 两个值都是 null
// 两个值都是 true 或者都是 false
// 两个值是由相同个数的字符按照相同的顺序组成的字符串
// 两个值指向同一个对象
// 两个值都是数字并且
// 都是正零 +0
// 都是负零 -0
// 都是 NaN
// 都是除零和 NaN 外的其它同一个数字
// 这种相等性判断逻辑和传统的 == 运算不同，
// == 运算符会对它两边的操作数做隐式类型转换（如果它们类型不同），然后才进行相等性比较，（所以才会有类似 "" == false 等于 true 的现象），但 Object.is 不会做这种类型转换。
// 这与 === 运算符的判定方式也不一样。=== 运算符（和== 运算符）将数字值 -0 和 +0 视为相等，并认为 Number.NaN 不等于 NaN。


//obj.hasOwnProperty(prop)
//会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
//所有继承了 Object 的对象都会继承到 hasOwnProperty 方法。
//这个方法可以用来检测一个对象是否含有特定的自身属性；和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

//即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。

//下面的例子演示了如何在遍历一个对象的所有属性时忽略掉继承属性，
//注意这里 for...in  循环只会遍历可枚举属性，所以不应该基于这个循环中没有不可枚举的属性而得出 hasOwnProperty 是严格限制于可枚举项目的（如同 Object.getOwnPropertyNames()）。
var buz = {
  fog: 'stack'
};

for (var name in buz) {
  if (buz.hasOwnProperty(name)) {
    console.log('this is fog (' +
      name + ') for sure. Value: ' + buz[name]);
  }
  else {
    console.log(name); // toString or something else
  }
}

//JavaScript 并没有保护 hasOwnProperty 这个属性名，
//因此，当某个对象可能自有一个占用该属性名的属性时，就需要使用外部的 hasOwnProperty 获得正确的结果：
var foo = {
  hasOwnProperty: function () {
    return false;
  },
  bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // 始终返回 false

// 如果担心这种情况，
// 可以直接使用原型链上真正的 hasOwnProperty 方法
({}).hasOwnProperty.call(foo, 'bar'); // true

// 也可以使用 Object 原型上的 hasOwnProperty 属性
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true


//obj.toString()
//返回一个表示该对象的字符串。

//使用 toString() 检测对象类型
//可以通过 toString() 来获取每个对象的类型。为了每个对象都能通过 Object.prototype.toString() 来检测，需要以 Object.prototype.call() 或者 Object.prototype.apply() 的形式来调用，
//传递要检查的对象作为第一个参数，称为 thisArg。
var toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]