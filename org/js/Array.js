// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
// (array与string记忆：slice:片; 部分;splice:胶接，粘接;split:分离,划分)

//http://louiszhai.github.io/2017/04/28/array/#Array构造器

//改变自身值的方法一共有9个，分别为pop、push、reverse、shift、sort、splice、unshift，copyWithin 和 fill
//单个元素操作于数组的都会改变数组，还有排序反转与胶接

//字符串的方法都不会改变自身，所以字符串和数组共有的方法也不会改变数组自身
//不会改变自身的方法一共有9个，分别为concat、join、slice、toString、toLocateString、indexOf、lastIndexOf、未标准的toSource以及ES7新增的方法includes。
//查找和遍历的不改变数组，还有两个数组操作（concat）获片（slice）和字符化

// 遍历方法(12个)，不会改变自身，分别为forEach、every、some、filter、map、reduce、reduceRight 以及ES6新增的方法entries、find、findIndex、keys、values

  

// 例如 javascript 中一个纯天然的类数组对象字符串（String），像join方法（不改变当前对象自身）就完全适用，可惜的是 Array.prototype 中很多方法均会去试图修改当前对象的 length 属性，比如说 pop、push、shift, unshift 方法，操作 String 对象时，由于String对象的长度本身不可更改，这将导致抛出TypeError错误。

// Array.prototype本身就是一个数组，并且它的长度为0。

//arr.sort([compareFunction])
//返回值:排序后的数组
//用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

// 如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。
// 例如 "Banana" 会被排列到 "cherry" 之前。
// 当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。
// 如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。
// 即 a 和 b 是两个将要被比较的元素：
// 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
// 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
// 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
// compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

//要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列
function compareNumbers(a, b) {
    return a - b;
}


//array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
//通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
//返回值:由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');// inserts at index 1
console.log(months);// expected output: Array ["Jan", "Feb", "March", "April", "June"]


//arr.slice([begin[, end]])
//返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));// expected output: Array ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));// expected output: Array ["camel", "duck"]

var array = [1, 3, 5];
var obj = { name: 'cc' };
var sReturn = array.forEach(function (value, index, array) {
    array[index] = value * value;
    console.log(this.name); // cc被打印了三次
}, obj);
console.log(array); // [1, 9, 25]
console.log(sReturn); // undefined, 可见返回值为undefined

//构造函数方法 Array.of、Array.from Array.isArray
// Array.of
// Array.of用于将参数依次转化为数组中的一项，然后返回这个新数组，而不管这个参数是数字还是其它。
//它基本上与Array构造器功能一致，唯一的区别就在单个数字参数的处理上。如下：
let arrOf = Array.of(8.0); // [8]
let arrA = Array(8.0); // [empty × 8]
let arrOf2 = Array.of(8.0, 5); // [8, 5]
console.log("arrOf,arrA,arrOf2", arrOf, arrA, arrOf2)

//由于Array.of与Array构造器的这种高度相似性，实现一个polyfill十分简单
if (!Array.of) {
    Array.of = function () {
        return Array.prototype.slice.call(arguments);
    };
}

// Array.from
// 语法：Array.from(arrayLike[, processingFn[, thisArg]])

// Array.from的设计初衷是快速便捷的基于其他对象创建新数组，准确来说就是从一个类似数组的可迭代对象创建一个新的数组实例
// 即只要一个对象有迭代器，Array.from就能把它变成一个数组（当然，是返回新的数组，不改变原对象）。

// 从语法上看，Array.from拥有3个形参，第一个为类似数组的对象，必选
// 第二个为加工函数，新生成的数组会经过该函数的加工再返回,可选
// 第三个为this作用域，表示加工函数执行时this的值,可选

//注意，一旦使用加工函数，必须明确指定返回值，否则将隐式返回undefined，最终生成的数组也会变成一个只包含若干个undefined元素的空数组。
var obj = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
let arrFrom = Array.from(obj, function (value, index) {
    console.log("Array.from:", value, index, this, arguments.length);
    return value.repeat(3); //必须指定返回值，否则返回undefined
}, obj);
console.log("arrFrom", arrFrom)

// String
Array.from('abc'); // ["a", "b", "c"]
// Set
Array.from(new Set(['abc', 'def'])); // ["abc", "def"]
// Map
Array.from(new Map([[1, 'abc'], [2, 'def']])); // [[1, 'abc'], [2, 'def']]
// 天生的类数组对象arguments
function fn() {
    return Array.from(arguments);
}
fn(1, 2, 3); // [1, 2, 3]

//Array.isArray
//判断一个变量是否数组类型

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
Array.isArray(a);

//Array.isArray的polyfill
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}

var array = ["abc", "xyz"];
var iterator = array.keys();
console.log(iterator.next()); // Object {value: 0, done: false}
console.log(iterator.next()); // Object {value: 1, done: false}
console.log(iterator.next()); // Object {value: undefined, done: false}