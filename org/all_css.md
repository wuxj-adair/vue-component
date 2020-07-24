### Flex 

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
注意，设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

#### 容器的属性

`flex-direction `   主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

`flex-wrap`            如果一条轴线排不下，如何换行

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

`flex-flow`      `flex-direction`属性和`flex-wrap`属性的简写形式

`justify-content`      在主轴上的对齐方式

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

`align-items`            交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

`align-content`        多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

#### 项目的属性

`order`            排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

`flex-grow`       放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

`flex-shrink`      缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

`flex-basis`     在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

### 像素

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

### CSS基础

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

