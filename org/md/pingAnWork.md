
VuePress

Antd Design of Vue

定制化：用ant-design-vue的一部分原因是在使用iView和element时很不方便(甚至不可以)去定制一些元素。
iView和element对于一些自定义元素都是采用[render函数](https://link.zhihu.com/?target=https%3A//cn.vuejs.org/v2/guide/render-function.html)的方式，在不使用JSX的情况下，render函数那是相当复杂。
得益于Vue 2.5.0版本之后新增的`slot-scope`属性，ant-design-vue可以让你继续使用模板语法进行自定义元素。

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

spf index.ts 遍历导出pages中页面

 函数式组件与类组件

Component 其实是由vue-class-component提供的，装饰器修饰组件，所以当你使用export default class ComponentName extends Vue{}导出声明class的时候，应该使用@Component装饰这个class
就可以给这个实例注入props,component等属性

vue-class-component 
vue-property-decorator

