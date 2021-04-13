#### IOS 中 new Date() 

```js
//IOS new Date() 中的时间不能用(1990-05-06 12:00) 这种格式.否则会报错(不能用 '-')
new Date('1990-05-06 12:00') // 在ios上使用报错

//方法一: 用"/" 代替 "-"
new Date('1990/05/06 12:00')

//方法二: 正则替换
var str = '1990-05-06 12:00'
new Date(str.replace(/-/g,'/'));
```

#### IOS  -webkit-overflow-scrolling

```CSS
/*开启GPU加速，导致APP 运行内存过高而崩溃。*/
/*在ios设备中，利用`overflow`来模拟滚动会出现卡顿的情况，可以通过设置`-webkit-overflow-scrolling: touch`来解决，原因是设置后ios会为其创建一个`UIScrollView`，利用硬件来加速渲染。*/
/*Phone手机滑动overflow-y: scroll的元素上滑动的时候会顿卡，需要加入如下的css代码就可以了*/
-webkit-overflow-scrolling:touch;
```

```css
-webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
-webkit-overflow-scrolling: auto; /* 当手指从触摸屏上移开，滚动会立即停止 */
```



####  IOS  有输入框在底部,点击输入框，弹出的键盘会把输入框盖住，只有在输入部分内容之后输入框才会出现在视窗中 

```JS
var element = document.getElementById("box");
element.scrollIntoView();
//element.scrollIntoView(false);
//scrollIntoView 可选参数是 true false，默认是true
//true 元素的顶端将和其所在滚动区的可视区域的顶端对齐。
//false 元素的底端将和其所在滚动区的可视区域的底端对齐。
```

#### 移动端样式

移动端文字行高不用rem的原因，也就是部分安卓手机不支持小数点，行高不支持奇数值

#### 多倍屏1px边框方案

```css
.class {
background-image:linear-gradient(0deg,#d9d9d950%,transparent50%);
background-size:100% 1px;
background-repeat:no-repeat;
background-position:top;
}
```



#### 去除ios input框点击时的灰色背景 

```css
-webkit-tap-highlight-color:rgba(0,0,0,0);
```

#### 取消a标签在移动端点击时的蓝色 

```css
-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
-webkit-user-select: none;
-moz-user-focus: none;
-moz-user-select: none;
```

####  使用图片作为a标签的点击按钮时，当触发touchstart的时候，往往会有一个灰色的背景 

```css
a,a:hover,a:active,a:visited,a:link,a:focus{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    outline:none;
    background: none;
    text-decoration: none;
}
```

####  改变选中内容的背景颜色 

```css
::selection { 
    background: #FFF; 
    color: #333; 
} 
::-moz-selection { 
    background: #FFF; 
    color: #333; 
} 
::-webkit-selection { 
    background: #FFF; 
    color: #333; 
} 
```

##### 禁止页面缩放

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
```

##### 禁止滚动传播

`移动端浏览器`有一个奇怪行为。当页面包含多个滚动区域时，滚完一个区域后若还存在滚动动量则会将这些剩余动量传播到下一个滚动区域，造成该区域也滚动起来。这种行为称为**滚动传播**。

```css
.elem {
    /*禁止滚动传播*/
    overscroll-behavior: contain;
}
```

##### 禁止屏幕抖动

对于一些突然出现滚动条的页面，可能会产生左右抖动的不良影响。在一个滚动容器里，打开弹窗就隐藏滚动条，关闭弹窗就显示滚动条，来回操作会让屏幕抖动起来。提前声明滚动容器的`padding-right`为滚动条宽度，就能有效消除这个不良影响。

每个`移动端浏览器`的滚动条宽度都有可能不一致，甚至不一定占位置，通过以下方式能间接计算出滚动条的宽度。`100vw`为视窗宽度，`100%`为滚动容器内容宽度，相减就是滚动条宽度，妥妥的动态计算。

```css
body {
    padding-right: calc(100vw - 100%);
}
```

##### 禁止动画闪屏

在移动设备上添加动画，多数情况会出现闪屏，给动画元素的父元素构造一个`3D环境`就能让动画稳定运行了。

```css
.elem {
    perspective: 1000;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}
```

##### 对齐输入占位

输入框文本位置整体偏上。`桌面端浏览器`里声明`line-height`等于`height`就能解决，但`移动端浏览器`里还是未能解决，需将`line-height`声明为`normal`才行。

```css
input {
    line-height: normal;
}
```

##### 修复点击无效

在苹果系统上有些情况下非可点击元素监听`click事件`可能会无效，针对该情况只需对不触发`click事件`的元素声明`cursor:pointer`就能解决。

```css
.elem {
    cursor: pointer;
}
```

##### 开启硬件加速

想动画更流畅吗，开启`GPU硬件加速`呗！

```css
.elem {
    transform: translate3d(0, 0, 0);
    /* transform: translateZ(0); */
}
```

##### 禁止滑动穿透

`移动端浏览器`里出现弹窗时，在屏幕上滑动能触发弹窗底下的内容跟着滚动。

首先明确解决滑动穿透需保持哪些交互行为，那就是`除了弹窗内容能点击或滚动，其他内容都不能点击或滚动`。目前很多解决方案都无法做到这一点，全部解决方案都禁止`<body>`的滚动行为却引发其他问题。

- 弹窗打开后内部内容无法滚动
- 弹窗关闭后页面滚动位置丢失
- `Webview`能上下滑动露出底色

当打开弹窗时给``声明`position:fixed;left:0;width:100%`并动态声明`top`。声明`position:fixed`会导致``滚动条消失，此时会发现虽然无滑动穿透，但页面滚动位置早已丢失。通过`scrollingElement`获取页面当前滚动条偏移量并将其取负值且赋值给`top`，那么在视觉上就无任何变化。当关闭弹窗时移除`position:fixed;left:0;width:100%`和动态`top`。

`scrollingElement`可兼容地获取`scrollTop`和`scrollHeight`等属性，在`移动端浏览器`里屡试不爽。`document.scrollingElement.scrollHeight`可完美代替曾经的`document.documentElement.scrollHeight || document.body.scrollHeight`。

该解决方案在视觉上无任何变化，完爆其他解决方案，其实就是一种反向思维和障眼法。该解决方案完美解决`固定弹窗`和`滚动弹窗`对``全局滚动的影响，当然也可用于局部滚动容器里，因此很值得推广。

```js
body.static {
    position: fixed;
    left: 0;
    width: 100%;
}

const body = document.body;
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
openBtn.addEventListener("click", e => {
    e.stopPropagation();//停止事件的传播
    const scrollTop = document.scrollingElement.scrollTop;
    body.classList.add("static");
    body.style.top = `-${scrollTop}px`;
});
closeBtn.addEventListener("click", e => {
    e.stopPropagation();
    body.classList.remove("static");
    body.style.top = "";
});
复制代码
```

##### 支持往返刷新
