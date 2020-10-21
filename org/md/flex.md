### Flex 

[flex]: http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html	"flex"

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

