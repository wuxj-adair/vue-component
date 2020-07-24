### BOM与DOM

window.location  获取页面 URL 地址

| 属性     | 描述                              |
| -------- | --------------------------------- |
| hash     | 从井号 (#) 开始的 URL（锚）       |
| host     | 主机名和当前 URL 的端口号         |
| hostname | 当前 URL 的主机名                 |
| href     | 完整的 URL                        |
| pathname | 当前 URL 的路径部分               |
| port     | 当前 URL 的端口号                 |
| protocol | 当前 URL 的协议                   |
| search   | 从问号 (?) 开始的 URL（查询部分） |

```js
function getQueryString(name, valueDefault = null) {
    let urlParams = window.location.search.substr(1).split("&");
    for (let it of urlParams) {
        let itParam = it.split("=");
        if (itParam[0] == name) {
            return itParam[1]
        }
    }
    return valueDefault;
}
var uid=getQueryString("uid")
```

### 安全防范

#### XSS   跨站脚本漏洞

就是攻击者想尽一切办法将可以执行的代码注入到网页中。总体上分为两类：**持久型和非持久型**。
持久型也就是攻击的代码被服务端写入进**数据库**中，这种攻击危害性很大，因为如果网站访问量很大的话，就会导致大量正常访问页面的用户都受到攻击。
举个例子，对于评论功能来说，就得防范持久型 XSS 攻击，因为我可以在评论中输入攻击内容，这种情况如果前后端没有做好防御的话，这段评论就会被存储到数据库中，这样每个打开该页面的用户都会被攻击到。

非持久型相比于前者危害就小的多了，一般通过**修改 URL 参数**的方式加入攻击代码，诱导用户访问链接从而进行攻击。举个例子，如果页面需要从 URL 中获取某些参数作为内容的话，不经过过滤就会导致攻击代码被执行（例：http://www.domain.com?name=<script>alert(1)</script>）

 对于 XSS 攻击来说，通常有两种方式可以用来防御。 

 1.转义输入输出的内容，对于引号、尖括号、斜杠进行转义 

```js
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
} 
//通过转义可以将攻击代码 `alert(1)` 变成 
// -> &lt;script&gt;alert(1)&lt;&#x2F;script&gt;
escape('<script>alert(1)</script>')
```

2.但是对于显示富文本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。对于这种情况，通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。 

```js
//示例使用了js-xss来实现，可以看到在输出中保留了h1标签且过滤了script标签。 
const xss = require('xss')
let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
// -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
console.log(html)
```

#### CSP

CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。

通常可以通过两种方式来开启 CSP：

1. 设置 HTTP Header 中的 `Content-Security-Policy`
2. 设置 `meta` 标签的方式 `  <meta http-equiv="Content-Security-Policy">  `

 以设置 HTTP Header 来举例：

 只允许加载本站资源 

```http
Content-Security-Policy: default-src ‘self’
```

 只允许加载 HTTPS 协议图片 

```http
Content-Security-Policy: img-src https://*
```

 允许加载任何来源框架 

```http
Content-Security-Policy: child-src 'none'
```

#### CSRF  跨站请求伪造

原理就是攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。

举个例子，假设网站中有一个通过 `GET` 请求提交用户评论的接口，那么攻击者就可以在钓鱼网站中加入一个图片，图片的地址就是评论接口

```html
<img src="http://www.domain.com/xxx?comment='attack'"/>
```

那么你是否会想到使用 `POST` 方式提交请求是不是就没有这个问题了呢？其实并不是，使用这种方式也不是百分百安全的，攻击者同样可以诱导用户进入某个页面，在页面中通过表单提交 `POST` 请求。 

### 如何防御

防范 CSRF 攻击可以遵循以下几种规则：

1. Get 请求不对数据进行修改
2. 不让第三方网站访问到用户 Cookie
3. 阻止第三方网站请求接口
4. 请求时附带验证信息，比如验证码或者 Token

#### SameSite

可以对 Cookie 设置 `SameSite` 属性。该属性表示 Cookie 不随着跨域请求发送，可以很大程度减少 CSRF 的攻击，但是该属性目前并不是所有浏览器都兼容。

#### 验证 Referer

对于需要防范 CSRF 的请求，我们可以通过验证 Referer 来判断该请求是否为第三方网站发起的。

#### Token

服务器下发一个随机 Token，每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。

{Authorization:that.token}
HTTP协议中的 Authorization 请求消息头含有服务器用于验证用户代理身份的凭证，
通常会在服务器返回401 Unauthorized 状态码以及WWW-Authenticate 消息头之后在后续请求中发送此消息头。

#### 序列化

序列化的作用是存储和传输：
	存储(对象本身存储的只是一个地址映射，如果断电，对象将不复存在，因此需将对象的内容转换成字符串的形式再保存在磁盘上)
	传输（例如 如果请求的Content-Type是 application/x-www-form-urlencoded，则前端这边需要使用qs.stringify(data)来序列化参数再传给后端，否则后端接受不到；ps:  Content-Type 为 application/json;charset=UTF-8或者 multipart/form-data 则可以不需要）

#### 浏览器是如何呈现一张页面的

过程：

- 解析HTML，并生成一棵DOM tree

- 解析各种样式并结合DOM tree生成一棵Render tree

- 对Render tree的各个节点计算布局信息，比如box的位置与尺寸

- 根据Render tree并利用浏览器的UI层进行绘制

  DOM对象本身是一个js对象 ，DOM tree和Render tree上的节点并非一一对应，比如一个"`display:none"`的节点就只会存在于DOM tree上，而不会出现在Render tree上，因为这个节点不需要被绘制。 

Webkit和Gecko 基本流程

![ Webkit的基本流程 ](.\js_layout.jpg)



![ gecko的基本流程 ](.\js_layout_gecko.jpg)



尽管webkit和Gecko使用的术语稍有不同，他们的主要流程基本相同。Gecko称可见的格式化元素组成的树为frame树，每个元素都是一个frame，webkit则使用render树这个名词来命名由渲染对象组成的树。Webkit中元素的定位称为布局，而Gecko中称为回流。Webkit称利用dom节点及样式信息去构建render树的过程为attachment，Gecko在html和dom树之间附加了一层，这层称为内容接收器，相当制造dom元素的工厂。下面将讨论流程中的各个阶段。 

渲染引擎开始解析html，并将标签转化为内容树中的dom节点。接着，它解析外部CSS文件及style标签中的样式信息。这些样式信息以及html中的可见性指令将被用来构建另一棵树——render树。Render树由一些包含有颜色和大小等属性的矩形组成，它们将被按照正确的顺序显示到屏幕上。Render树构建好了之后，将会执行布局过程，它将确定每个节点在屏幕上的确切坐标。再下一步就是绘制，即遍历render树，并使用UI后端层绘制每个节点。
值得注意的是，这个过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html都解析完成之后再去构建和布局render树。它是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。

如下的操作会触发浏览器执行layout：

- 通过js获取需要计算的DOM属性
- 添加或删除DOM元素
- resize浏览器窗口大小
- 改变字体
- css伪类的激活，比如:hover
- 通过js修改DOM元素样式且该样式涉及到尺寸的改变

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

   

   ### 存储

   | **存储方式** | cookie | localStorage | sessionStorage | IndexedDB  | webSQL | FileSystem |
| :----------- | :----- | :----------- | :------------- | :--------- | :----- | :--------- |
   | **类型**     |        | key-value    | key-value      | NoSQL      | SQL    |            |
   | **数据格式** | string | string       | string         | object     |        |            |
   | **容量**     | 4k     | 5M           | 5M             | 500M       | 60M    |            |
   | **进程**     | 同步   | 同步         | 同步           | 异步       | 异步   |            |
   | **检索**     |        | key          | key            | key, index | field  |            |
   | **性能**     |        | 读快写慢     |                | 读慢写快   |        |            |



