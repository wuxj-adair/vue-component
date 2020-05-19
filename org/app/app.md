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
/*Phone手机滑动overflow-y: scroll的元素上滑动的时候会顿卡，需要加入如下的css代码就可以了*/
-webkit-overflow-scrolling:touch;
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

