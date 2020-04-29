// this的指向大致可以分为五种.
// this 动态绑定   箭头函数的this指向是静态的,声明的时候就确定了下来.符合js的词法作用域
// 1. 默认绑定   默认绑定一般发生在回调函数,函数直接调用;
// 2. 隐式绑定   谁调用就是指向谁
// 3. 显示绑定   call,apply,bind
// 4. new绑定
// 5. es6的箭头函数 es6的箭头函数比较特殊,箭头函数this为父作用域的this，不是调用时的this.
//    要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的this指向是静态的,声明的时候就确定了下来.符合js的词法作用域

//需要回想一下绑定this的五种方式,现在要来给调用的函数绑定this了, 这里默认绑定和new肯定用不了,这里就使用隐式绑定去实现显式绑定了
//最后一步要返回函数调用的返回值,并且把context上的属性删了才不会造成影响
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
//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.myCall = function (context, ...args) {
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
