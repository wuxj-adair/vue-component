

赋值的时候，变量的形状必须和接口的形状保持一致**。

```js
//可选属性   该属性可以不存在。
//只读属性    readonly,对象中的readonly字段只能在创建的时候被赋值
interface Person {
    readonly id: number;
    name: string;
    age?: number;
}
let tom: Person = {
    id: 89757,
    name: 'Tom'
};
```

```js
//任意属性
//使用 [propName: string] 定义了任意属性取 string 类型的值。
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

注意点：**一旦定义了任意属性，那么确定属性和可选属性必须是它的类型的子集**

```js
//在这个例子中，任意属性的值是string，但是可选属性age的值却是number，number不是string的子属性，所以报错。
//所以，对于任意属性，我们最好定义为any
interface Human{
    name: string;
    age?: number;
    [propName: string]: string;
}

let zink: Human= {
    name: 'zink',
    age: 25,  //error
    gender: 'man'  
};
```

```js
//一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

```js
//重载
//重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
//比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
//利用联合类型，我们可以这么实现：
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
//然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。
//这时，我们可以使用重载定义多个 reverse 的函数类型：
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
//上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
//注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
```

