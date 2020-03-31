[Vue API 盲点解析]: https://juejin.im/book/5b23a5aef265da59716fda09/section/5b23b27051882574a756e7ed



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

