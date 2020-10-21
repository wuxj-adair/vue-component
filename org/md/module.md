通行的Javascript模块规范共有两种：[CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)和[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)。

#### CommonJS

require()，用于加载模块

```
var math = require('math');
math.add(2,3); // 5
```

第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。
因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景

#### AMD

[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：

```ruby
require([module], callback);
```

第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：

```jsx
　require(['math'], function (math) {
　　　　math.add(2, 3);
　　});
```

math.add()与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。

#### 为什么要用require.js？

最早的时候，所有Javascript代码都写在一个文件里面，只要加载这一个文件就够了。后来，代码越来越多，一个文件不够了，必须分成多个文件，依次加载。

```xml
<script src="1.js"></script>
<script src="2.js"></script>
<script src="3.js"></script>
<script src="4.js"></script>
```

这段代码依次加载多个js文件。这样的写法有很大的缺点。
首先，加载的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；
其次，由于js文件之间存在依赖关系，因此必须严格保证加载顺序（比如上例的1.js要在2.js的前面），依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。

require.js的诞生，就是为了解决这两个问题：
（1）实现js文件的异步加载，避免网页失去响应；
（2）管理模块之间的依赖性，便于代码的编写和维护。

#### require.js的加载

使用require.js

```xml
　<script src="js/require.js"></script>
```

有人可能会想到，加载这个文件，也可能造成网页失去响应。解决办法有两个，一个是把它放在网页底部加载，另一个是写成下面这样：

```xml
<script src="js/require.js" defer async="true" ></script>
```

async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。

加载require.js以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是main.js，也放在js目录下面。那么，只需要写成下面这样就行了：

```xml
<script src="js/require.js" data-main="js/main"></script>
```

data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。

#### 主模块的写法

上一节的main.js，我把它称为"主模块"，意思是整个网页的入口代码。它有点像C语言的main()函数，所有代码都从这儿开始运行。
 主模块依赖于其他模块，这时就要使用AMD规范定义的的require()函数。

```jsx
// main.js
　　require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　　　　// some code here
　　});
```

require()函数接受两个参数。第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

require()异步加载moduleA，moduleB和moduleC，浏览器不会失去响应；它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

假定主模块依赖jquery、underscore和backbone这三个模块，main.js就可以这样写：

```jsx
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){
　　　　// some code here
　　});
```

require.js会先加载jQuery、underscore和backbone，然后再运行回调函数。主模块的代码就写在回调函数中。

#### 模块的加载

上一节最后的示例中，主模块的依赖模块是['jquery', 'underscore', 'backbone']。默认情况下，require.js假定这三个模块与main.js在同一个目录，文件名分别为jquery.js，underscore.js和backbone.js，然后自动加载。

使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js）的头部。参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。

```css
require.config({
　　　　paths: {
　　　　　　"jquery": "jquery.min",
　　　　　　"underscore": "underscore.min",
　　　　　　"backbone": "backbone.min"
　　　　}
　　});
```

上面的代码给出了三个模块的文件名，路径默认与main.js在同一个目录（js子目录）。如果这些模块在其他目录，比如js/lib目录，则有两种写法。一种是逐一指定路径。

```css
require.config({
　　　　paths: {
　　　　　　"jquery": "lib/jquery.min",
　　　　　　"underscore": "lib/underscore.min",
　　　　　　"backbone": "lib/backbone.min"
　　　　}
　　});
```

另一种则是直接改变基目录（baseUrl）。

```css
require.config({
　　　　baseUrl: "js/lib",
　　　　paths: {
　　　　　　"jquery": "jquery.min",
　　　　　　"underscore": "underscore.min",
　　　　　　"backbone": "backbone.min"
　　　　}
　　});
```

```css
require.config({
　　　　paths: {
　　　　　　"jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
　　　　}
　　});
```

require.js要求，每个模块是一个单独的js文件。这样的话，如果加载多个模块，就会发出多次HTTP请求，会影响网页的加载速度。因此，require.js提供了一个[优化工具](http://requirejs.org/docs/optimization.html)，当模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少HTTP请求数。

#### AMD模块的写法

require.js加载的模块，采用AMD规范。
就是模块必须采用特定的define()函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。
假定现在有一个math.js文件，它定义了一个math模块。那么，math.js就要这样写：

```jsx
   // math.js
　　define(function (){
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
　　　　return {
　　　　　　add: add
　　　　};
　　});
```

加载方法

```jsx
   // main.js
　　require(['math'], function (math){
　　　　alert(math.add(1,1));
　　});
```

如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。

```jsx
define(['myLib'], function(myLib){
　　　　function foo(){
　　　　　　myLib.doSomething();
　　　　}
　　　　return {
　　　　　　foo : foo
　　　　};
　　});
```

当require()函数加载上面这个模块的时候，就会先加载myLib.js文件。

#### 加载非规范的模块

理论上，require.js加载的模块，必须是按照AMD规范、用define()函数定义的模块。但是实际上，虽然已经有一部分流行的函数库（比如jQuery）符合AMD规范，更多的库并不符合。那么，require.js是否能够加载非规范的模块呢？回答是可以的。

这样的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征。
举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。

```java
require.config({
　　　　shim: {
　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}

　　　　}

　　});
```

require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。

比如，jQuery的插件可以这样定义：

```java
shim: {
　　　　'jquery.scroll': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'jQuery.fn.scroll'
　　　　}
　　}
```

require.js插件
require.js还提供一系列[插件](https://github.com/jrburke/requirejs/wiki/Plugins)，实现一些特定的功能。
domready插件，可以让回调函数在页面DOM结构加载完成后再运行。

```jsx
　require(['domready!'], function (doc){
　　　　// called once the DOM is ready
　　});
```



```jsx
　define([
　　　　'text!review.txt',
　　　　'image!cat.jpg'
　　　　],
　　　　function(review,cat){
　　　　　　console.log(review);
　　　　　　document.body.appendChild(cat);
　　　　}
　　);
```

### [require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)

### [浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)

### [AMD与CMD的区别](http://blog.csdn.net/jackwen110200/article/details/52105493)

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出。
这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的。
目前这些规范的实现都能达成浏览器端模块化开发的目的。
区别：

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible. 

2.  CMD 推崇依赖就近，AMD 推崇依赖前置。

   ```js
   // CMD
   define(function(require, exports, module) { 
       var a = require('./a')
       a.doSomething() // 此处略去 100 行 
       var b = require('./b') // 依赖可以就近书写 
       b.doSomething() 
       // ... 
   })
   ```

```js
   // AMD 默认推荐的是
   define(['./a', './b'], function(a, b) {
       // 依赖必须一开始就写好 a.doSomething() 
       // 此处略去 100 行 
       b.doSomething() 
       //...
   }) 
```

虽然 AMD 也支持 CMD 的写法，同时还支持将 require 作为依赖项传递，但 RequireJS 的作者默认是最喜欢上面的写法，也是官方文档里默认的模块定义写法。

```jsx
//require.js案例
require.config({
　　paths: {
　　　　"m1": "m1",
　　　　"underscore": "m2",
　　　　"backbone": "m3"
　　}
});
require(['m1', 'underscore', 'backbone'], function(m0, m2, m3) {
    console.log(m0)
    console.log(m2)
    console.log(m3)
    console.log( m0.add(1,2) )
    console.log( m2.remove(3) )
    console.log( m3.getname(5) )
})
```

```jsx
//m1.js
define(function (){
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
　　　　return {
　　　　　　add: add
　　　　};
　　});
```

```jsx
//m2.js
define(function (){
　　　　var remove = function (x){
　　　　　　return x;
　　　　};
　　　　return {
            remove: remove
　　　　};
　});
```

```jsx
//m3.js
define(['m4'], function (m4){
　　　　var getname = function (x){
　　　　　　return m4.setname;
　　　　};
　　　　return {
            getname: getname
　　　　};
　　});
```

```jsx
//m4.js
define(function (){
　　　　var setname = function (x){
　　　　　　return x
　　　　};
　　　　return {
            setname: setname
　　　　};
　　});
```

```js
//sea.js
....
```

```jsx
//main.js
define(function(require) {
    var m1 = require("./m1.js")
    var m2 = require("./m2.js")
    console.log(m1)  //{getName , setName }
    console.log(m2) //{a, aa} 
})
```

```jsx
//m1.js
define(function(require, exports) {
    var m3 = require("./m3.js")

    exports.getName = function() {
        return m3.getName
    }
    exports.setName = function(str) {
        return str
    } 
})
```

```jsx
//m2.js
define(function(require, exports) {
    var m3 = require("./m3.js")
    var a = 'cxh'
    console.log(m3)   // {getName }
    return {
        a: a,
        aa: m3.getName
    }
})
```

```jsx
//m3.js
define(function(require, exports) {
    exports.getName = function(str) {
        return str
    }
})
```

### ES6 Module

ES6   浏览器的模块化标准。

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

