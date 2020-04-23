/*
 * @Author: your name
 * @Date: 2020-01-16 14:50:11
 * @LastEditTime: 2020-04-23 09:21:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\Function.js
 */
//call和apply
//区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。(记忆：apply 与array都是a开头，所以apply()接受的是一个参数数组)

//func.apply(thisArg, [argsArray])
//调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数
//返回值：调用有指定this值和参数的函数的结果。

//用 apply 将数组添加到另一个数组
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]


//function.call(thisArg, arg1, arg2, ...)
//使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
// 返回值：使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。

//使用 call 方法调用父构造函数
function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}

var cheese = new Food('feta', 5);


//function.bind(thisArg[, arg1[, arg2[, ...]]])
//创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用
//返回值:返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。

// 偏函数
// bind() 的另一个最简单的用法是使一个函数拥有预设的初始参数。
// 只要将这些参数（如果有的话）作为 bind() 的参数写在 this 后面。
// 当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。
function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var result1 = addArguments(1, 2); // 3
// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37);
var result2 = addThirtySeven(5); // 37 + 5 = 42 
var result3 = addThirtySeven(5, 10);// 37 + 5 = 42 ，第二个参数被忽略



//箭头函数
//引入箭头函数有两个方面的作用：更简短的函数并且不绑定this。
//没有自己的this，arguments，super或new.target。
//箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

var elements = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
  ];
  
  elements.map(function(element) { 
    return element.length; 
  }); // 返回数组：[8, 6, 7, 9]
  
  // 上面的普通函数可以改写成如下的箭头函数
  elements.map((element) => {
    return element.length;
  }); // [8, 6, 7, 9]
  
  // 当箭头函数只有一个参数时，可以省略参数的圆括号
  elements.map(element => {
   return element.length;
  }); // [8, 6, 7, 9]
  
  // 当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号
  elements.map(element => element.length); // [8, 6, 7, 9]
  
  // 在这个例子中，因为我们只需要 `length` 属性，所以可以使用参数解构
  // 需要注意的是字符串 `"length"` 是我们想要获得的属性的名称，而 `lengthFooBArX` 则只是个变量名，
  // 可以替换成任意合法的变量名
  elements.map(({ "length": lengthFooBArX }) => lengthFooBArX); // [8, 6, 7, 9]

  
// 通过 call 或 apply 调用
// 由于箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立）
var adder = {
    base : 1,
      
    add : function(a) {
      var f = v => v + this.base;
      return f(a);
    },
  
    addThruCall: function(a) {
      var f = v => v + this.base;
      var b = {
        base : 2
      };
              
      return f.call(b, a);
    }
  };
  
  console.log(adder.add(1));         // 输出 2
  console.log(adder.addThruCall(1)); // 仍然输出 2


  //不绑定arguments对象
  //所以使用剩余参数
  function foo(arg) { 
    var f = (...args) => args[0]; 
    return f(arg); 
  }
  foo(1); // 1
  
  function foo(arg1,arg2) { 
      var f = (...args) => args[1]; 
      return f(arg1,arg2); 
  } 
  foo(1,2);  //2
  

// 箭头函数不能用作构造器，和 new一起用会抛出错误。
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor

// 箭头函数没有prototype属性。
var Foo = () => {};
console.log(Foo.prototype); // undefined


// yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作函数生成器。


//arguments
//arguments对象是所有（非箭头）函数中都可用的局部变量。
//arguments对象不是一个 Array 。它类似于Array，但除了length属性和索引元素之外没有任何Array属性。

//将arguments转换为一个真正的Array：
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);
// ES2015
const args = Array.from(arguments);
const args = [...arguments];
// 对参数使用slice会阻止某些JavaScript引擎中的优化 (比如 V8)。
//如果你关心性能，尝试通过遍历arguments对象来构造一个新的数组。另一种方法是使用被忽视的Array构造函数作为一个函数：
var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));