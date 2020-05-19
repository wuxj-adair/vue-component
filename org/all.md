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

### CSS-B

##### 物理像素(physical pixel)

一个物理像素是显示器(手机屏幕)上最小的物理显示单元。

##### 设备独立像素(density-independent pixel)

设备独立像素(也叫密度无关像素)，css像素。

##### 设备像素比(device pixel ratio )

```
设备像素比（dpr） = 物理像素 / 设备独立像素 // 在某一方向上，x方向或者y方向
```

在javascript中，可以通过`window.devicePixelRatio`获取到当前设备的dpr。

在css中，可以通过`-webkit-device-pixel-ratio`，`-webkit-min-device-pixel-ratio`和 `-webkit-max-device-pixel-ratio`进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。

以`iphone6`为例：

1. 设备宽高为`375×667`，可以理解为设备独立像素(或css像素)。
2. dpr为2，根据上面的计算公式，其物理像素就应该`×2`，为`750×1334`。

在不同的屏幕上(普通屏幕 vs retina屏幕)，css像素所呈现的大小(物理尺寸)是一致的，不同的是1个css像素所对应的物理像素个数是不一致的。

在普通屏幕下，1个css像素 对应 1个物理像素(`1:1`)。
在retina 屏幕下，1个css像素对应 4个物理像素(`1:4`)。

##### 位图像素

一个位图像素是栅格图像(如：png, jpg, gif等)最小的数据单元。

对于dpr=2的retina屏幕而言，1个位图像素对应于4个物理像素，由于单个位图像素不可以再进一步分割，所以只能就近取色，从而导致图片模糊。

所以，对于图片高清问题，比较好的方案就是`两倍图片`(@2x)。

如：200×300(css pixel)img标签，就需要提供400×600的图片。

如此一来，位图像素点个数就是原来的`4`倍，在retina屏幕下，`位图像素点个数`就可以跟`物理像素点个数`形成 `1 : 1`的比例，图片自然就清晰了(这也就解释了，为啥视觉稿的画布大小要`×2`？)。

-webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
-webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
开启GPU加速，导致APP 运行内存过高而崩溃。
在ios设备中，利用`overflow`来模拟滚动会出现卡顿的情况，可以通过设置`-webkit-overflow-scrolling: touch`来解决，原因是设置后ios会为其创建一个`UIScrollView`，利用硬件来加速渲染。

移动端文字行高不用rem的原因，也就是部分安卓手机不支持小数点，行高不支持奇数值

### CSS

1. block 占满一行，inline根据文字多少系统强制设置宽高，设置float浮动系统会把该元素表现为block

2. text-align对适用于盒模型的元素（如 h1 ～ h6、p 等，显示为单独的行）来说是起作用的，但对短语内容元素（如strong、em、a、cite 等，显示在行内）来说则不起作用，除非将它们的显示改为块级。（短语内容元素在 HTML5 之前称为“行内”元素）

3. 为了让短语内容元素中的文字对齐，区别于周边的文本，必须先将它们默认的 display: inline; 样式改为 display:block; 或 display: inline-block;（前者会让它们像段落一样显示为单独的行），然后再设置相应的 text-align 值。

4. 对于设置了display: inline-block; 的元素，需要设置一定的宽度才能看到对齐效果。

5. 实际上，需要为“行内”元素设置 text-align 属性的情况是非常少见的。

6. 如果手动设置 width，并将左右外边距都设为 auto，那么两个外边距就将设为相等的最大值，这样会导致元素居中。例如，.page { margin: 0 auto; } 会使对应的元素在页面居中显示。

7. 如果元素位于另一个元素的上面，对于相互接触的两个 margin（即元素相互接触的下外边距和上外边距）， 仅使用其中较大的一个，另一个外边距会被叠加。左右外边距不叠加。

8. 可以通过 float 属性使元素浮动在文本或其他元素上。可以使用这种技术让文本环绕在图像或者其他元素周围，也可以使用这种技术创建多栏布局等

9.  浮动的元素对文档流的影响与非浮动元素的影响是不同的。图像等浮动元素会让接下来的内容环绕在它周围。不过，它并不会影响父元素或其他祖先元素的高度，因此从这一点来说，它不属于文档流的一部分。

10. 使用 clear 属性清除浮动效果。如果对某个元素使用该属性，该元素和它后面的元素就会显示在浮动元素的下面。

11. 如果要让浮动元素的祖先元素在高度上包含浮动元素，并消除浮动，可以使用clearfix

12. 使用 clearfix 方法。要使用这种方法，只需要在样式表中引入 .clearfix 的规则，然后为浮动元素的父元素（该元素为希望清除浮动的元素） 添加 clearfix 类，从而可以支撑起父元素，

    ```css
    /* 为浮动元素的父元素（该元素为希望清除浮动的元素） 添加 clearfix  */
    .clearfix:before,
    .clearfix:after {
        content: " ";
        display: table;
    }
    .clearfix:after {
         clear: both;
    }
    .clearfix {
         *zoom: 1;
    }
    
    ```

    

13. 应该将 clear 属性添加到不希望环绕浮动对象的元素上。因此，如果要让一个元素在右侧没有浮动元素（以及任何靠向右侧的元素）之后才显示，就为它添加 clear: right;（而不是为浮动的元素添加此样式规则）。而 clearfix 和overflow 方法是应用于浮动元素的父元素或祖先元素的。

14. 通过对元素进行绝对定位，即指定它们相对于 body 或最近的已定位祖先元素的精确位置，可以让元素脱离正常的文档流。这与相对定位不同，绝对定位的元素不会在原先的位置留下空白。这与让元素浮动也不同。对于绝对定位的元素，其他元素不会环绕在它的周围。事实上，其他内容不知道它的存在，它也不知道其他内容的存在。

15. 可以使用 vertical-align 设置表格单元格中内容的对齐方式。通常，默认的样式是中间对齐，而不像表格以外的内容那样与基线对齐。除了表格以外，vertical-align 属性仅适用于行内元素，不能应用于块级元素。

16. 一定要使用 max-width: 100% 而不是width: 100%。它们都能让图像在容器内缩放，不过，width: 100% 会让图像尽可能地填充容器，如果容器的宽度比图像宽，图像就会放大到超过其本来尺寸，有可能会显得较为难看。

17. 有时元素的背景会透过其圆角。为了避免这种情况，可以在元素的 border-radius 声明后面增加一条样式规则：background-clip: padding-box;。

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

![ Webkit的基本流程 ](F:\gitW\vue-component-book-master\org\js_layout.jpg)



![ gecko的基本流程 ](F:\gitW\vue-component-book-master\org\js_layout_gecko.jpg)



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

![prototype](F:\gitW\vue-component-book-master\org\prototype.png)

##### 原型和原型链    

1. 所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（null除外）

2. 所有的引用类型（数组、对象、函数），都有一个__proto__属性（隐式原型），属性值是一个普通的对象

3. 所有的函数，都有一个prototype属性，属性值也是一个普通的对象

4. 所有的引用类型（数组、对象、函数），__proto__属性值指向它的构造函数的prototype属性值。即：fn.__proto__ === Fn.prototype 

5. Function也是一个函数，函数是一种对象，也有__proto__属性。既然是函数，那么它一定是被Function创建。所以——Function是被自身创建的。所以它的__proto__指向了自身的Prototype。 

   ![img](file:///C:\Users\ADAIR_~1\AppData\Local\Temp\ksohtml5532\wps1.jpg)

   

   ### 存储

   | **存储方式** | cookie | localStorage | sessionStorage | IndexedDB  | webSQL | FileSystem |
   | :----------- | :----- | :----------- | :------------- | :--------- | :----- | :--------- |
   | **类型**     |        | key-value    | key-value      | NoSQL      | SQL    |            |
   | **数据格式** | string | string       | string         | object     |        |            |
   | **容量**     | 4k     | 5M           | 5M             | 500M       | 60M    |            |
   | **进程**     | 同步   | 同步         | 同步           | 异步       | 异步   |            |
   | **检索**     |        | key          | key            | key, index | field  |            |
   | **性能**     |        | 读快写慢     |                | 读慢写快   |        |            |


### MVVM : Model-View-ViewModel

Model 层: 对应数据层的域模型(融合了行为和数据的域的对象模型)，它主要做域模型的同步。通过 Ajax/fetch 等 API 完成客户端和服务端业务 Model 的同步。
在层间关系里，它主要用于抽象出 ViewModel 中视图的 Model。
View 层:动态视图模板。除了定义结构、布局外，它展示的是 ViewModel 层的数据和状态。View 层不负责处理状态，View 层做的是 数据绑定的声明、 指令的声明、 事件绑定的声明。
ViewModel 层:把 View 需要的层数据暴露，并对 View 层的 数据绑定声明、 指令声明、 事件绑定声明 负责，也就是处理 View 层的具体业务逻辑。
ViewModel 底层会做好绑定属性的监听。
当 ViewModel 中数据变化，View 层会得到更新；
而当 View 中声明了数据的双向绑定（通常是表单元素），框架也会监听 View 层（表单）值的变化。一旦值变化，View 层绑定的 ViewModel 中的数据也会得到自动更新。

### Vue Loader 

Vue Loader 是一个 [webpack](https://webpack.js.org/) 的 loader

```搜索bash
npm install -D vue-loader vue-template-compiler
```

 每个 `vue` 包的新版本发布时，一个相应版本的 `vue-template-compiler` 也会随之发布。编译器的版本必须和基本的 `vue` 包保持同步，这样 `vue-loader` 就会生成兼容运行时的代码。这意味着**你每次升级项目中的 `vue` 包时，也应该匹配升级 `vue-template-compiler`。** 

```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

#### 处理资源路径

##### 转换规则

资源 URL 转换会遵循如下规则：

- 如果路径是绝对路径 (例如 `/images/foo.png`)，会原样保留。
- 如果路径以 `.` 开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析。
- 如果路径以 `~` 开头，其后的部分将会被看作模块依赖。这意味着你可以用该特性来引用一个 Node 依赖中的资源。
- 如果路径以 `@` 开头，也会被看作模块依赖。如果你的 webpack 配置中给 `@` 配置了 alias，这就很有用了。所有 `vue-cli` 创建的项目都默认配置了将 `@` 指向 `/src`。

##### 转换资源 URL 的好处

`file-loader` 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 **你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题**。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。

`url-loader` 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 `file-loader` 处理。



#### Scoped CSS

当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。这类似于 Shadow DOM 中的样式封装。它有一些注意事项，但不需要任何 polyfill。它通过使用 PostCSS 来实现转换

​      使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式 。



#### 深度作用选择器

如果你希望 `scoped` 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 `>>>` 操作符：

```html
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

上述代码将会编译成：

```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```

有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。

通过 `v-html` 创建的 DOM 内容不受 scoped 样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。

- **Scoped 样式不能代替 class**。考虑到浏览器渲染各种 CSS 选择器的方式，当 `p { color: red }` 是 scoped 时 (即与特性选择器组合使用时) 会慢很多倍。如果你使用 class 或者 id 取而代之，比如 `.example { color: red }`，性能影响就会消除。你可以在[这块试验田](https://stevesouders.com/efws/css-selectors/csscreate.php)中测试它们的不同。
- **在递归组件中小心使用后代选择器!** 对选择器 `.a .b` 中的 CSS 规则来说，如果匹配 `.a` 的元素包含一个递归子组件，则所有的子组件中的 `.b` 都将被这个规则匹配。

####  热重载

“热重载”不只是当你修改文件的时候简单重新加载页面。启用热重载后，当你修改 `.vue` 文件时，该组件的所有实例将在**不刷新页面**的情况下被替换。它甚至保持了应用程序和被替换组件的当前状态！

##### 状态保留规则

当编辑一个组件的 <template> 时，这个组件实例将就地重新渲染，并保留当前所有的私有状态。能够做到这一点是因
为模板被编译成了新的无副作用的渲染函数。 当编辑一个组件的 <script> 时，这个组件实例将就地销毁并重新创建。(应用中其它组件的状态将会被保留) 是因为 <script> 可能包含带有副作用的生命周期钩子，所以将重新渲染替换为重新加载是必须的，这样做可以确保组件行为的一致性。这也意味着，如果你的组件带有全局副作用，则整个页面将会被重新加载。 <style> 会通过 vue-style-loader 自行热重载，所以它不会影响应用的状态。

### Vue 

#### 使用 performance 开启性能追踪

`performance API` 是 Vue 全局配置 API 中的一个，我们可以使用它来进行网页性能的追踪，我们可以在入口文件中添加： 

```js
if (process.env.NODE_ENV !== 'production') {
    Vue.config.performance = true;
}
```

 该 API功能只适用于开发模式和支持 `performance.mark` API 的浏览器上，开启后我们可以下载 [Vue Performance Devtool](https://chrome.google.com/webstore/search/vue performance devtool) 这一 chrome 插件来看查看各个组件的加载情况。

![](F:\gitW\vue-component-book-master\src\org\vue\performance.webp.jpg)

而其在 Vue 源码中主要使用了 [window.performance](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance) 来获取网页性能数据，其中包含了 `performance.mark` 和 `performance.measure`。

- performance.mark 主要用于创建标记

- performance.measure 主要用于记录两个标记的时间间隔

  ```js
  performance.mark('start'); // 创建 start 标记
  performance.mark('end'); // 创建 end 标记
  
  performance.measure('output', 'start', 'end'); // 计算两者时间间隔
  
  performance.getEntriesByName('output'); // 获取标记，返回值是一个数组，包含了间隔时间数据
  ```

  #### 使用 errorHandler 来捕获异常

  ```js
  Vue.config.errorHandler = function (err, vm, info) {
      let { 
          message, // 异常信息
          name, // 异常名称
          stack  // 异常堆栈信息
      } = err;
  
      // vm 为抛出异常的 Vue 实例
      // info 为 Vue 特定的错误信息，比如错误所在的生命周期钩子
  }
  ```

  

#### 使用 nextTick 将回调延迟到下次 DOM 更新循环之后执行

在某些情况下，我们改变页面中绑定的数据后需要对新视图进行一些操作，而这时候新视图其实还未生成，需要等待 DOM 的更新后才能获取的到，在这种场景下我们便可以使用 nextTick 来延迟回调的执行。

```js
this.$nextTick(() => {
    this.$refs.box.getElementsByTagName('li')[0].innerHTML = 'hello';
})
```

 当然你也可以使用 ES6 的 `async/await` 语法来改写上述方法： 

```js
methods: {
    async getData() {
        this.arr = [1, 2, 3];  
        await this.$nextTick();
        this.$refs.box.getElementsByTagName('li')[0].innerHTML = 'hello';
    }
}
```

Vue 源码中使用了 3 种方式来实现nextTick ：

- promise.then 延迟调用

- setTimeout(func, 0) 延迟功能

- MutationObserver 监听变化

  [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 这一 HTML5 新特性，介绍：我们可以使用它创建一个观察者对象，其会监听某个 DOM 元素，并在它的 DOM 树发生变化时执行我们提供的回调函数。实例化代码及配置如下 

```js
//观察 id 为 box 下的 DOM 树变化，一旦发生变化就会触发相应的回调方法，实现延迟调用的功能。
// 传入回调函数进行实例化
var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        console.log(mutation.type);
    })
});

// 选择目标节点
var target = document.querySelector('#box');
 
// 配置观察选项
var config = { 
    attributes: true, // 是否观察属性的变动
    childList: true, // 是否观察子节点的变动（指新增，删除或者更改）
    characterData: true // 是否观察节点内容或节点文本的变动
};
 
// 传入目标节点和观察选项
observer.observe(target, config);
 
// 停止观察
observer.disconnect();
```

#### 使用 watch 的深度遍历和立即调用功能

`watch` 监听数据变化：

- `handler` 函数回调
- deep 设置为 true 用于监听对象内部值的变化
- immediate 设置为 true 将立即以表达式的当前值触发回调

```vue
<!-- 以下代码我们修改了 obj 对象中 a 属性的值，可以触发其 watch 中的 handler 回调输出新的对象，而如果不加 deep: true，我们只能监听 obj 的改变，并不会触发回调。同时我们也添加了 immediate: true 配置，其会立即以 obj 的当前值触发回调。-->
<template>
    <button @click="obj.a = 2">修改</button>
</template>
<script>
export default {
    data() {
        return {
            obj: {
                a: 1,
            }
        }
    },
    watch: {
        obj: {
            handler: function(newVal, oldVal) {
                console.log(newVal); 
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
```

#### 对低开销的静态组件使用 v-once

 Vue 提供了 `v-once` 指令用于只渲染元素和组件一次，一般可以用于存在大量静态数据组件的更新性能优化，注意是大量静态数据，因为少数情况下我们的页面渲染会因为一些静态数据而变慢。如果你需要对一个组件使用 v-once，可以直接在组件上绑定：

 

```vue
<!-- 这时候因为组件绑定了 v-once，所以无论 msg 的值如何变化，组件内渲染的永远是其第一次获取到的初始值。因此我们在使用 v-once 的时候需要考虑该组件今后的更新情况，避免不必要的问题产生。-->
<my-component v-once :data="msg"></my-component>
```

#### MVVM

Model：数据模型，在Model中定义数据修改和操作的业务逻辑。
View：UI组件，将数据模型转化成UI展现出来。
ViewModel：监听模型数据的改变和控制视图行为、处理用户交互，就是一个同步View 和 Model的对象，连接Model和View。

#### 生命周期

1. 首先需要创建一个实例，也就是在 new Vue ( ) 的对象过程当中，首先执行了init（init是vue组件里面默认去执行的），在init的过程当中首先调用了beforeCreate，然后在injections（注射）和reactivity（反应性）的时候，它会再去调用created。
   所以在init的时候，事件已经调用了，我们在beforeCreate的时候千万不要去修改data里面赋值的数据，最早也要放在created里面去做（添加一些行为）。

2. 当created完成之后，它会去判断instance（实例）里面是否含有“el”option（选项），如果没有的话，它会调用vm.$mount(el)这个方法，然后执行下一步；如果有的话，直接执行下一步。紧接着会判断是否含有“template”这个选项，如果有的话，它会把template解析成一个render function ，这是一个template编译的过程，结果是解析成了render函数：

   ```js
   render (h) {
     return h('div', {}, this.text)
   }
   ```

   render函数里面的传参h就是Vue里面的createElement方法，return返回一个createElement方法，

   其中要传3个参数：
   第一个参数就是创建的div标签；
   第二个参数传了一个对象，对象里面可以是我们组件上面的props，或者是事件之类的东西；
   第三个参数就是div标签里面的内容，这里我们指向了data里面的text。
   render函数是发生在beforeMount和mounted之间的，说明在beforeMount的时候，$el还只是我们在HTML里面写的节点，然后到mounted的时候，它就把渲染出来的内容挂载到了DOM节点上。这中间的过程其实是执行了render function的内容。

   在使用.vue文件开发的过程当中，我们在里面写了template模板，在经过了vue-loader的处理之后，就变成了render function，最终放到了vue-loader解析过的文件里面。
   这样做有什么好处呢？原因是由于在解析template变成render function的过程，是一个非常耗时的过程，vue-loader帮我们处理了这些内容之后，当我们在页面上执行vue代码的时候，效率会变得更高

3. renderError：在开发的时候它才会被调用，在正式打包上线的过程当中，它是不会被调用的。帮助我们调试render里面的一些错误。有且只有当render方法里面报错了，才会执行renderError方法。

   

   ```js
   renderError (h, err) {
     return h('div', {}, err.stack)
   }
   ```

   #### Vuex
   
   Vuex 类似 Redux 的**状态管理器**，用来管理**Vue**的所有组件状态。
   
   #### 为什么使用Vuex
   
   当你打算开发大型单页应用（SPA），会出现多个视图组件依赖同一个状态，来自不同视图的行为需要变更同一个状态。遇到以上情况时候，你就应该考虑使用Vuex了，它能把组件的共享状态抽取出来，当做一个全局单例模式进行管理。这样不管你在何处改变状态，都会通知使用该状态的组件做出相应修改。
   
   #### 最简单的Vuex示例
   
   ```js
   import Vue from 'vue';
   import Vuex form 'vuex';
   
   Vue.use(Vuex);
   
   const store = new Vuex.Store({
       state: {
           count: 0
       },
       mutations: {
           increment (state) {
               state.count++
           }
       }
   })
   ```
   
   以上就是一个最简单的Vuex，每一个Vuex应用就是一个store，在store中包含组件中的共享**状态**`state`和改变状态的**方法**（暂且称作方法）`mutations`。
   
   需要注意的是只能通过`mutations`改变store的`state`的状态，不能通过`store.state.count = 5;`直接更改，`state`相当于对外的只读属性。
   
   使用`store.commit`方法触发`mutations`改变`state`:
   
   ```js
   store.commit('increment');
   
   console.log(store.state.count)  // 1
   ```
   
   一个简简单单的Vuex应用就实现了。
   
   #### 在Vue组件使用Vuex
   
   如果希望Vuex状态更新，相应的Vue组件也得到更新，最简单的方法就是在Vue的`computed`（计算属性）获取`state`
   
   ```js
   // Counter 组件
   const Counter = {
       template: `<div>{{ count }}</div>`,
       computed: {
           count () {
               return store.state.count;
           }
       }
   }
   ```
   
   上面的例子是直接操作全局状态`store.state.count`，那么每个使用该Vuex的组件都要引入。为了解决这个，Vuex通过`store`选项，提供了一种机制将状态从根组件**注入**到每一个子组件中。
   
   ```js
   // 根组件
   import Vue from 'vue';
   import Vuex form 'vuex';
   
   Vue.use(Vuex);
   const app = new Vue({
       el: '#app',
       store,
       components: {
           Counter
       },
       template: `
           <div class="app">
               <counter></counter>
           </div>
       `
   })
   ```
   
   通过这种**注入**机制，就能在子组件`Counter`通过`this.$store`访问：
   
   ```js
   // Counter 组件
   const Counter = {
       template: `<div>{{ count }}</div>`,
       computed: {
           count () {
               return this.$store.state.count
           }
       }
   }
   ```
   
   ### mapState函数
   
   ```js
   computed: {
       count () {
           return this.$store.state.count
       }
   }
   ```
   
   这样通过`count`计算属性获取同名`state.count`属性，是不是显得太重复了，我们可以使用`mapState`函数简化这个过程。
   
   ```js
   import { mapState } from 'vuex';
   
   export default {
       computed: mapState ({
           count: state => state.count,
           countAlias: 'count',    // 别名 `count` 等价于 state => state.count
       })
   }
   ```
   
   还有更简单的使用方法：
   
   ```js
   computed: mapState([
     // 映射 this.count 为 store.state.count
     'count'
   ])
   ```
   
   ### Getters对象
   
   如果我们需要对`state`对象进行做处理计算，如下：
   
   ```js
   computed: {
       doneTodosCount () {
           return this.$store.state.todos.filter(todo => todo.done).length
       }
   }
   ```
   
   如果多个组件都要进行这样的处理，那么就要在多个组件中复制该函数。这样是很没有效率的事情，当这个处理过程更改了，还有在多个组件中进行同样的更改，这就更加不易于维护。
   
   Vuex中`getters`对象，可以方便我们在`store`中做集中的处理。Getters接受`state`作为第一个参数：
   
   ```js
   const store = new Vuex.Store({
     state: {
       todos: [
         { id: 1, text: '...', done: true },
         { id: 2, text: '...', done: false }
       ]
     },
     getters: {
       doneTodos: state => {
         return state.todos.filter(todo => todo.done)
       }
     }
   })
   ```
   
   **在Vue中通过`store.getters`对象调用。**
   
   ```js
   computed: {
     doneTodos () {
       return this.$store.getters.doneTodos
     }
   }
   ```
   
   Getter也可以接受其他**getters**作为第二个参数：
   
   ```js
   getters: {
     doneTodos: state => {
         return state.todos.filter(todo => todo.done)
     },
     doneTodosCount: (state, getters) => {
       return getters.doneTodos.length
     }
   }
   ```
   
   ### mapGetters辅助函数
   
   与`mapState`类似，都能达到简化代码的效果。`mapGetters`辅助函数仅仅是将store中的getters映射到局部计算属性：
   
   ```js
   import { mapGetters } from 'vuex'
   
   export default {
     // ...
     computed: {
       // 使用对象展开运算符将 getters 混入 computed 对象中
       ...mapGetters([
         'doneTodosCount',
         'anotherGetter',
         // ...
       ])
     }
   }
   ```
   
   上面也可以写作：
   
   ```js
   computed: mapGetters([
         'doneTodosCount',
         'anotherGetter',
         // ...
       ])
   ```
   
   所以在Vue的`computed`计算属性中会存在两种辅助函数：
   
   ```js
   import { mapState, mapGetters } form 'vuex';
   
   export default {
       // ...
       computed: {
           mapState({ ... }),
           mapGetter({ ... })
       }
   }
   ```
   
   ### Mutations
   
   更改Vuex的store中的状态的唯一方法就是`mutations`。
   
   每一个`mutation`都有一个**事件类型**`type`和一个**回调函数**`handler`。
   
   ```js
   const store = new Vuex.Store({
     state: {
       count: 1
     },
     mutations: {
       increment (state) {
         // 变更状态
         state.count++
       }
     }
   })
   ```
   
   调用`mutation`，需要通过`store.commit`方法调用`mutation type`：
   
   ```js
   store.commit('increment')
   ```
   
   #### Payload 提交载荷
   
   也可以向`store.commit`传入第二参数，也就是mutation的`payload`:
   
   ```js
   mutaion: {
       increment (state, n) {
           state.count += n;
       }
   }
   
   store.commit('increment', 10);
   ```
   
   单单传入一个`n`，可能并不能满足我们的业务需要，这时候我们可以选择传入一个`payload`对象：
   
   ```js
   mutation: {
       increment (state, payload) {
           state.totalPrice += payload.price + payload.count;
       }
   }
   
   store.commit({
       type: 'increment',
       price: 10,
       count: 8
   })
   ```
   
   #### mapMutations函数
   
   不例外，mutations也有映射函数`mapMutations`，帮助我们简化代码，使用`mapMutations`辅助函数将组件中的`methods`映射为`store.commit`调用。
   
   ```js
   import { mapMutations } from 'vuex'
   
   export default {
     // ...
     methods: {
       ...mapMutations([
         'increment' // 映射 this.increment() 为 this.$store.commit('increment')
       ]),
       ...mapMutations({
         add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
       })
     }
   }
   ```
   
   **注** Mutations必须是同步函数。
   
   如果我们需要异步操作，Mutations就不能满足我们需求了，这时候我们就需要`Actions`了。

