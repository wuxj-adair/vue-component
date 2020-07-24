VuePress为技术文档而优化的内置 Markdown 拓展

在 Markdown 文件中使用 Vue 组件的能力

Vue 驱动的自定义主题系统

自动生成 Service Worker

Google Analytics 集成

基于 Git 的 “最后更新时间”

多语言支持

默认主题包含：

- 响应式布局
- 可选的主页
- 简洁的开箱即用的标题搜索
- Algolia 搜索
- 可自定义的导航栏 和 侧边栏
- 自动生成的 GitHub 链接和页面的编辑链接

使用Vue.observable()进行状态管理

Antd Design of Vue

## **定制化：**

用ant-design-vue的一部分原因是在使用iView和element时很不方便(甚至不可以)去定制一些元素。
iView和element对于一些自定义元素都是采用[render函数](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/v2/guide/render-function.html)的方式，在不使用JSX的情况下，render函数那是相当复杂。得益于Vue 2.5.0版本之后新增的`slot-scope`属性，ant-design-vue可以让你继续使用模板语法进行自定义元素。

[]: https://antdv.com/docs/vue/introduce-cn/

const { findApiDirs, findApiFiles } = require('../utils')
packages demo spf  index.ts

每个文件夹下面都应该包括`index.ts`文件, 用于导出对应功能需要导出的东西. 针对集合类文件夹在index.ts文件中需要导出下面子文件夹的所有信息, 推荐通过 [require.context](http://localhost:8080/guide/standard/dir.html) 的方式进行导出, 具体参见 `myMenu` 文件夹

layout.tsx  	项目的布局页面 主页面
index.ts    	 模块导出文件

app libs 很多工具文件

```js
export const children: RouteConfig[] = route.children = collectRouteConfigs(
    //require.context函数遍历文件夹的所有文件一次性导入
    // require.context函数接受三个参数
	//directory {String} -读取文件的路径
	//useSubdirectories {Boolean} -是否遍历文件的子目录
	//regExp {RegExp} -匹配文件的正则
  require.context('../pages', true, /^\.\/([a-zA-Z-]+)\/index.ts$/)
)
```

#### declare  module

就是说，虽然 TypeScript 本身不支持导入非 JavaScript 内容，但是为了支持其他工具接下来的工作，所以做了这么个语法支持。

${ a! }
 如果正常写法${ a } ，且服务器并没有向域中存入数据 a 的话，页面上的样式就不能正确显示，且后台会报错。如果括号里加上！，则不会影响样式的展示，后台也不会报错，只是取到一个空值罢了。

spf index.ts 遍历导出pages中页面

 