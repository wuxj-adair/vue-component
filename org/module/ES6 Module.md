### ES6 Module

ES6  Module  浏览器的模块化标准。
静态编译生成只读引用，执行时动态应用，变量绑定所在模块，单例模式

##### 静态编译

​		ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个只读引用。

##### 动态引用

​		脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像 Unix 系统的“符号连接”，原始值变了，`import`加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
​		由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错。



```javascript
// 下面代码说明，ES6 模块输入的变量`counter`是活的，完全反应其所在模块`lib.js`内部的变化。
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

```javascript
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo); // bar
setTimeout(() => console.log(foo), 500);// baz
```

```javascript
// main.js从lib.js输入变量obj，可以对obj添加属性，但是重新赋值就会报错。因为变量obj指向的地址是只读的，不能重新赋值，这就好比main.js创造了一个名为obj的const变量。
// lib.js
export let obj = {};

// main.js
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

```javascript
// mod.js
// 输出一个C的实例。不同的脚本加载这个模块，得到的都是同一个实例。
function C() {
  this.sum = 0;
  this.add = function () {
    this.sum += 1;
  };
  this.show = function () {
    console.log(this.sum);
  };
}

export let c = new C();

// x.js和y.js加载的都是C的同一个实例。
// x.js
import {c} from './mod';
c.add();

// y.js
import {c} from './mod';
c.show();

// main.js
import './x';
import './y';

//执行main.js，输出的是1
$ babel-node main.js
1
```



#### 模块引入

浏览器使用以下方式引入一个ES6模块化文件

```
<script src="./xxx.js" type="module"></script>
```

#### 模块导出

1. 模块导出分为两种， 基本导出和默认导出

   ```js
   export var a = 1 // 基本导出a=1  
   var c = 3; export {c} // 基本导出c=3. 
   var c = 3; export {c as temp} // 基本导出temp=3.  
   export {c as default} // 默认导出default = 3。
   ```

   ```js
   export default 3 // 默认导出default = 3
   ```

   我们平时 直接 export default 一把梭。

#### 模块导入

```js
import {a, b} from "模块路径"  
import {a as temp1 , b as temp2} from "模块路径"  
import {defalut as a} from "模块路径"
import c from "模块路径"  //相当于import {defalut as c} from "模块路径"  
import * as obj from "模块路径"
```

##### 模块导入时注意

1. ES6 module 采用依赖预加载模式， 所有模块导入均会提升到代码顶部
2. 不能将导入代码放置到判断， 循环中
3. 导入的内容放置到常量中， 不可更改
4. ES6 module使用了缓存， 保证每个模块仅加载一次

