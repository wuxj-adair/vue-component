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

每个执行上下文，都有三个重要属性：

1. 变量对象(Variable object，VO)

2. 作用域链(Scope chain)

3. this

   

执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：进入执行上下文  代码执行

在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
在代码执行阶段，会再次修改变量对象的属性值