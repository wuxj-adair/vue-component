### Webpack

Webpack 就像工厂中的一条产品流水线。原材料经过 Loader 与 Plugin 的一道道处理，最后输出结果。

- 通过链式调用，按顺序串起一个个 Loader；
- 通过事件流机制，让 Plugin 可以插入到整个生产过程中的每个步骤中；

#### loader与plugins

loader：webpack 自身只理解 JavaScript，loader 能够去处理非 JavaScript 文件并转化 JavaScript，处理源文件，一次处理一个。
plugins：用来扩展 webpack 功能，插件能够执行很多任务。如：打包优化、压缩等。

#### 构建流程

- 生成 options（将 webpack.config.js 和 shell 中的参数合并到 options 对象）。
- 实例化 compiler 对象 （webpack 全局对象，包含 entry、output、loader、plugins等所有配置对象）。
- 实例化 compilation 对象（compiler.run 方法执行，开始编译过程，生成 compilation 对象）。
- 分析入口 js 文件，调用 AST 引擎处理入口文件，生成抽象语法树 AST，根据 AST 构建模块的所有依赖。
- 通过 loader 处理入口文件的所有依赖，转换为 js 模块，生成 AST，然后继续递归遍历，直至所有依赖被分析完毕。
- 对生成的所有 module 进行处理，调用 plugins，合并，拆分，生成 chunk。
- 将 chunk 生成为对应 bundle 文件，输出到目录。

#### 常用 Plugin

- UglifyJsPlugin: 压缩、混淆代码；
- CommonsChunkPlugin: 代码分割；
- ProvidePlugin: 自动加载模块；
- html-webpack-plugin: 加载 html 文件，并引入 css / js 文件；
- extract-text-webpack-plugin / mini-css-extract-plugin: 抽离样式，生成 css 文件；
- DefinePlugin: 定义全局变量；
- optimize-css-assets-webpack-plugin: CSS 代码去重；
- webpack-bundle-analyzer: 代码分析；
- compression-webpack-plugin: 使用 gzip 压缩 js 和 css；
- happypack: 使用多进程，加速代码构建；
- EnvironmentPlugin: 定义环境变量；

#### Gulp与webpack

Gulp是一个工具，webpack是模块化方案
**gulp**
gulp强调的是前端开发的工作流程，我们可以通过配置一系列的task，定义task处理的事务（例如文件压缩合并、雪碧图、启动server、版本控制等），然后定义执行顺序，来让gulp执行这些task，从而构建项目的整个前端开发流程。
PS：简单说就一个Task Runner
**webpack**
webpack是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图片、js文件、css文件等）都看成模块，通过loader（加载器）和plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。
PS：webpack is a module bundle