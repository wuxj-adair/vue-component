/*
 * @Author: your name
 * @Date: 2020-01-16 14:50:11
 * @LastEditTime : 2020-01-19 09:47:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\Function.js
 */
//call()方法的作用和 apply() 方法类似，
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




