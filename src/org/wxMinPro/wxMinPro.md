 `hidden`元素对块状布局才生效 



```xml
<!-- display:flex,非block,hidden没生效 -->
<view hidden="true" style="display:flex;flex-direction: row;">
        <text>text1</text>
        <text>text2</text>
    </view>
```

```xml
 <view hidden="true" style="display:{{hideview ? none : flex}};flex-direction: row;">
        <text>text1</text>
        <text>text2</text>
    </view>
```

