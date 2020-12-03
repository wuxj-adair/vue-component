 TypeScript 是一门静态弱类型语言，可以使用一些尚在提案阶段的语法特性，可以有控制访问符。
很多项目，尤其是中大型项目，我们是需要团队多人协作的，那么如何保证协作呢？这个时候可能需要大量的文档和注释，显式类型就是最好的注释，而通过 TypeScript 提供的类型提示功能我们可以非常舒服地调用同伴的代码，由于 TypeScript 的存在我们可以节省大量沟通成本、代码阅读成本等。
TypeScript 对类型的检查严格程度是可以通过 `tsconfig.json` 来配置的。

TypeScript 的优势：

1. 规避大量低级错误，避免时间浪费，省时
2. 减少多人协作项目的成本，大型项目友好，省力
3. 良好代码提示，不用反复文件跳转或者翻文档，省心



### 静态类型

编程语言的类型定义，简单来说，一门语言在编译时报错，那么是静态语言，如果在运行时报错，那么是动态语言。

TypeScript 是静态弱类型语言，这跟C语言是一样的，并不是所谓的强类型，因为要兼容 JavaScript， 所以 TypeScript 几乎不限制 JavaScript 中原有的隐式类型转换，它对类型的隐式转换是有容忍度的，而真正的静态强类型语言比如 Java、C# 是不会容忍隐式转换的。

### 初始化 TypeScript 工作环境的简易步骤：

1. 安装 TypeScript
2. 用 `tsc --init` 初始化配置
3. 编辑 `tsconfig.json` 配置 TypeScript 选项

### TypeScript 原始类型

- 布尔类型：`boolean`
- 数字类型：`number`
- 字符串类型：`string`
- 空值：`void`
- Null 和 Undefined：`null` 和 `undefined`
- Symbol 类型：`symbol`
- BigInt 大数整数类型：`bigint`

```typescript
//只有`null`和`undefined`可以赋给`void`:
const a: void = undefined
```

默认情况下 null 和 undefined 是所有类型的子类型，就是说你可以把 null 和 undefined 赋值给 number 类型的变量。
但是在正式项目中一般都是开启 --strictNullChecks 检测的，即 null 和 undefined 只能赋值给 any 和它们各自(一个例外是 undefined 是也可以分配给void)，可以规避非常多的问题。

### BigInt

`BigInt` 类型在 TypeScript3.2 版本被内置，使用 `BigInt` 可以安全地存储和操作大整数，即使这个数已经超出了JavaScript构造函数 `Number` 能够表示的安全整数范围。

**注意**：我们在使用 `BigInt` 的时候，必须添加 `ESNext` 的编译辅助库,如下：

![2020-01-05-20-47-38](C:\gitW\org\org\typescript\resource\1)

在 JavaScript 中采用双精度浮点数,这导致精度有限，比如 `Number.MAX_SAFE_INTEGER` 给出了可以安全递增的最大可能整数，即`2**53-1`,我们看一下案例:

```js
const max = Number.MAX_SAFE_INTEGER;

const max1 = max + 1
const max2 = max + 2

max1 === max2 //true
```

`max1`与`max2`居然相等？这就是超过精读范围造成的问题，而`BigInt`正是解决这类问题而生的:

```js
// 注意，这里是 JavaScript 代码，并不是 typescript
//值得注意的是我们需要用 BigInt(number) 把 Number 转化为 BigInt,同时如果类型是 BigInt ,那么数字后面需要加 n ,就如同上面例子的 const max1 = max + 1n 中的 1n。
const max = BigInt(Number.MAX_SAFE_INTEGER);

const max1 = max + 1n
const max2 = max + 2n

max1 === max2 // false
```

```typescript
//在TypeScript中，`number` 类型虽然和 `BigInt` 都是有表示数字的意思，但是实际上两者类型是不同的:
declare let foo: number;
declare let bar: bigint;

foo = bar; // error: Type 'bigint' is not assignable to type 'number'.
bar = foo; // error: Type 'number' is not assignable to type 'bigint'.
```



### Typescript 中其他常见类型

计算机类型系统理论中的[顶级类型](https://en.wikipedia.org/wiki/Top_type):

- any
- unknown

类型系统中的[底部类型](https://en.wikipedia.org/wiki/Bottom_type):

- never

非原始类型(non-primitive type):

- object
- 数组
- 元组  等。

#### unknown

`unknown` 是 TypeScript 3.0 引入了新类型,是 `any` 类型对应的安全类型。
 它跟 `any` 一样,可以是任何类型,
`unknown` 和 `any` 的主要区别是 `unknown` 类型会更加严格:
 在对`unknown`类型的值执行大多数操作之前,我们必须进行某种形式的检查,而在对 `any` 类型的值执行操作之前,我们不必     进行任何检查。

区别(虽然它们都可以是任何类型,但是当 `unknown` 类型被确定是某个类型之前,它不能被进行任何操作比如实例化、getter、函数执行等等):

```typescript
let value: any;

value.foo.bar;  // OK
value();        // OK
new value();    // OK
value[0][1];    // OK
```

如果是 `unknown` 类型,那么结果大不相同:

```typescript
let value: unknown;

value.foo.bar;  // ERROR
value();        // ERROR
new value();    // ERROR
value[0][1];    // ERROR
```

 `unknown` 可以用来缩小其类型范围

```typescript
function getValue(value: unknown): string {
  if (value instanceof Date) { // 这里由于把value的类型缩小为Date实例的范围内,所以`value.toISOString()`
    return value.toISOString();
  }

  return String(value);
}
```

### never

never 表示的是那些永不存在的值的类型，
never 类型是任何类型的子类型，也可以赋值给任何类型；
没有类型是 never 的子类型或可以赋值给 never 类型（除了never本身之外）。

> 即使any也不可以赋值给never。

```typescript
//两个场景中 never 比较常见:
// 抛出异常的函数永远不会有返回值
function error(message: string): never {
    throw new Error(message);
}

// 空数组，而且永远是空的
const empty: never[] = []
```

### 元组（Tuple）

元组类型与数组类型非常相似，表示一个已知元素数量和类型的数组，各元素的类型不必相同。

元组中包含的元素，必须与声明的类型一致，而且不能多、不能少，甚至顺序不能不符。

```typescript
let x: [string, number];
x = ['hello', 10, false] // Error
x = ['hello'] // Error
```

```typescript
let x: [string, number];
x = ['hello', 10]; // OK
x = [10, 'hello']; // Error
```

我们可以把元组看成严格版的数组，比如`[string, number]`我们可以看成是:

```typescript
interface Tuple extends Array<string | number> {
  0: string;
  1: number;
  length: 2;
}
```

元组继承于数组，但是比数组拥有更严格的类型检查。

此外，还有元组越界问题，比如 Typescript 允许向元组中使用数组的push方法插入新元素:

```typescript
const tuple: [string, number] = ['a', 1];
tuple.push(2); // ok
console.log(tuple); // ["a", 1, 2] -> 正常打印出来
//但是当我们访问新加入的元素时，会报错:
console.log(tuple[2]); // Tuple type '[string, number]' of length '2' has no element at index '2'
```

### 枚举的本质

可以把枚举类型看成一个JavaScript对象，而由于其特殊的构造，导致其拥有正反向同时映射的特性。

```typescript
enum Direction {
    Up = 10,
    Down,
    Left,
    Right
}
//上面的 `Direction` 枚举类型为例,我们不妨看一下枚举类型被编译为 JavaScript 后的样子
(function (Direction) {
    Direction[Direction["Up"] = 10] = "Up";
    Direction[Direction["Down"] = 11] = "Down";
    Direction[Direction["Left"] = 12] = "Left";
    Direction[Direction["Right"] = 13] = "Right";
})(Direction || (Direction = {}));
```

### 属性检查

```typescript
interface Config {
  width?: number;
}

function  CalculateAreas(config: Config): { area: number} {
  let square = 100;
  if (config.width) {
      square = config.width * config.width;
  }
  return {area: square};
}
//注意传入的参数是 `widdth`，并不是 `width`。
//此时TypeScript会认为这段代码可能存在问题。对象字面量当被赋值给变量或作为参数传递的时候，会被特殊对待而且经过“额外属性检查”。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。
// error: 'widdth' not expected in type 'Config'
let mySquare = CalculateAreas({ widdth: 5 });
```

目前官网推荐了三种主流的解决办法：

```typescript
//第一种使用类型断言
let mySquare = CalculateAreas({ widdth: 5 } as Config);
```

```typescript
//第二种添加字符串索引签名
interface Config {
   width?: number;
   //这样Config可以有任意数量的属性，并且只要不是width，那么就无所谓他们的类型是什么了。
   [propName: string]: any;
}
```

```typescript
//第三种将字面量赋值给另外一个变量
//本质上是转化为 any 类型，不建议采用该方法。
let options: any = { widdth: 5 };
let mySquare = CalculateAreas(options);
```

### 继承接口

```typescript
interface VIPUser extends User, SupperUser {
    broadcast: () => void
}
```

## 泛型约束

![2019-06-25-14-41-19](C:\gitW\org\org\typescript\resource\2)

```typescript
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] // ok
}
```

```typescript
interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}

class Demo<T extends FirstInterface & SecondInterface> {
  private genericProperty: T

  useT() {
    this.genericProperty.doSomething() // ok
    this.genericProperty.doSomethingElse() // ok
  }
}
```

