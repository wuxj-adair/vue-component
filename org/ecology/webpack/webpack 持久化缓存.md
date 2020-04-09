[webpack 持久化缓存]: https://blog.csdn.net/csdn_yudong/article/details/79190629#comments

webpack 中进行持久化缓存，需要做到一下两点：

1、保持 hash 值的唯一性，即为每个打包后的资源生成一个独一无二的 hash 值，只要打包内容不一致，那么 hash 值就不一致。
2、保证 hash 值的稳定性，我们需要做到修改某个模块的时候，只有受影响的打包后文件 hash 值改变，与该模块无关的打包文件 hash 值不变。

hash 文件名是实现持久化缓存的第一步，目前 webpack 有两种计算 hash 方式（[hash] 和 [chunkhash]）

- hash 代表每次 webpack 在编译的过程中会生成唯一的 hash 值，在项目中任何一个文件改动后就会被重新创建，然后 webpack 计算新的 hash 值。
- chunkhash 是根据模块计算出来的 hash 值，所以某个文件的改动只会影响它本身的 hash 值，不会影响其他文件。
- 
所以如果你只是单纯的将所有内容打包成同一个文件，那么 hash 就能够满足你了，如果你的项目涉及到拆包，分模块进行加载等等，那么你需要用 chunkhash ，来保证每次更新之后只有相关的文件 hash 值发生改变。

所以我们在一份具有持久化缓存的 webpack 配置应该长这样：

```js
module.exports = {
  entry: __dirname + 'src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash:8].js'
  }
}
```

上面代码的含义就是： 以 index.js 为入口，将所有的代码全部打包成一个文件取名为 index.xxxx.js 并放到 dist 目录下，现在我们可以在每次更新项目的时候做到生成新命名的文件了。

如果是应付简单的场景，这样做就够了，
但是在大型多页面应用中，我们往往需要对页面进行性能优化：
1、分离业务代码和第三方的代码：之所以将业务代码和第三方代码分离出来，是因为业务代码更新频率高，而第三方代码更新迭代速度慢，所以我们将第三方代码（库，框架）进行抽离，这样可以充分利用浏览器的缓存来加载第三方库。
2、按需加载：比如在使用 React-Router 的时候，当用户需要访问到某个路由的时候再去加载对应的组件，那么用户没有必要在一开始的时候就将所有的路由组件下载到本地。
3、在多页面应用中，我们往往可以将公共模块进行抽离，比如 header，footer 等等，这样页面在进行跳转的时候这些公共模块因为存在于缓存里，就可以直接进行加载了，而不是再进行网络请求了。

那么如何进行拆包，分模块进行加载，这就需要 webpack 内置插件： CommonsChunkPlugin，下面我将通过一个例子，来诠释 webpack 该如何进行配置。

例子大概是这样描述的：它由两个页面组成 pageA 和 pageB

```js
// src/pageA.js
import componentA from './common/componentA';
 
// 使用到 jquery 第三方库，需要抽离，避免业务打包文件过大
import $ from 'jquery';
 
// 加载 css 文件，一部分为公共样式，一部分为独有样式，需要抽离
import './css/common.css'
import './css/pageA.css';
 
console.log(componentA);
console.log($.trim('    do something   '));
 
// src/pageB.js
// 页面 A 和 B 都用到了公共模块 componentA，需要抽离，避免重复加载
import componentA from './common/componentA';
import componentB from './common/componentB';
import './css/common.css'
import './css/pageB.css';
 
console.log(componentA);
console.log(componentB);
 
// 用到异步加载模块 asyncComponent，需要抽离，加载首屏速度
document.getElementById('xxxxx').addEventListener('click', () => {
  import( /* webpackChunkName: "async" */
    './common/asyncComponent.js').then((async) => {
      async();
  })
})
 
// 公共模块基本长这样
export default "component X";
```

 上面的页面内容基本简单涉及到了我们拆分模块的三种模式：拆分公共库，按需加载和拆分公共模块。那么接下来要配置 webpack ： 

```js
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    pageA: [path.resolve(__dirname, './src/pageA.js')],
    pageB: path.resolve(__dirname, './src/pageB.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })  
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource && resource.indexOf('node_modules') >= 0 && resource.match(/.js$/)
      )
    }),
    new ExtractTextPlugin({
      filename: `css/[name].[chunkhash:8].css`,
    }),
  ]
}
```

第一个 CommonsChunkPlugin 用于抽离公共模块，相当于是说 webpack 大佬，如果你看到某个模块被加载两次及以上，那么请你帮我移到 common chunk 里面，这里 minChunks 为 2，粒度拆解最细，你可以根据自己的实际情况，看选择是用多少次模块才将他们抽离。

第二个 CommonsChunkPlugin 用来提取第三方代码，将它们进行抽离，判断资源是否来自 node_modules，如果是，则说明是第三方模块，那就将它们抽离。相当于是告诉 webpack 大佬，如果你看见某些模块是来自 node_modules 目录的，并且名字是 .js 结尾的话，麻烦把他们都移到 vendor chunk 里去，如果 vendor chunk 不存在的话，就创建一个新的。

这样配置有什么好处，随着业务的增长，我们依赖的第三方库代码很可能会越来越多，如果我们专门配置一个入口来存放第三方代码，这时候我们的 webpack.config.js 就会变成：

```js
// 不利于扩展
module.exports = {
  entry: {
    app: './src/main.js',
    vendor: [
      'vue',
      'axios',
      'vue-router',
      'vuex'
    ]
  }
}
```

第三个 ExtractTextPlugin 插件用于将 css 从打包好的 js 文件中抽离，生成独立的 css 文件，想象一下，当你只是修改了下样式，并没有修改页面的功能逻辑，你肯定不希望你的 js 文件 hash 值变化，你肯定是希望 css 和 js 能够相互分开，且互不影响。

运行 webpack 后可以看到打包之后的效果：

```
├── css
│   ├── common.2beb7387.css
│   ├── pageA.d178426d.css
│   └── pageB.33931188.css
└── js
    ├── async.03f28faf.js
    ├── common.2beb7387.js
    ├── pageA.d178426d.js
    ├── pageB.33931188.js
    └── vendor.22a1d956.js
```

可以看出 css 和 js 已经分离，并且我们对模块进行了拆分，保证了模块 chunk 的唯一性，当你每次更新代码的时候，会生成不一样的 hash 值。
