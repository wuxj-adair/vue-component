#### 使用 performance 开启性能追踪

`performance API` 是 Vue 全局配置 API 中的一个，我们可以使用它来进行网页性能的追踪，我们可以在入口文件中添加： 

```js
if (process.env.NODE_ENV !== 'production') {
    Vue.config.performance = true;
}
```

 该 API功能只适用于开发模式和支持 `performance.mark` API 的浏览器上，开启后我们可以下载 [Vue Performance Devtool](https://chrome.google.com/webstore/search/vue performance devtool) 这一 chrome 插件来看查看各个组件的加载情况。

![](C:/gitW/org/org/vue/performance.webp.jpg)

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

  