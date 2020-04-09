```js
new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
```

首先我们要明白CommonsChunk是干什么用的，Common是通用、共用的意思，Chunk是大块的意思，那么整个这个插件的作用就是把我们代码中用到的零散的js文件合并成一个一个的大块供系统调用，这样可以有效地减少http请求次数。

那么把哪些js合并在一个大块里，依据什么原则呢？就由这个minChunks来决定，min是minimum的缩写，意思就是最少大块数，它需要是比1大的整数，同时还要求小于等于大块总数，这里如果你设置为2，那就是说如果有2个以上的大块都用到了某一个js文件，那么我们就把它抽取出来放到这个公共大块里，这样就不会造成重复浪费。

而infinity是无限的意思，这就是说必须有无限多个大块都用到了这个js文件，我们才把它抽取出来放到这个公共大块里，很显然，不可能用任何js文件满足这个条件被无限多个大块使用，所以这里生成的其实就是一个空的大块，它只有一个文件名，而文件长度是0，这就是minChunks: Infinity的作用。

#### webpack项目提示Invalid Host header

通过服务器域名访问时显示Invalid Host header，这是由于新版的webpack-dev-server出于安全考虑，默认检查hostname，如果hostname不是配置内的，将中断访问。可以在build目录中的webpack.base.config.js中添加如下webpack-dev-server配置：

```js
devServer: {
　　disableHostCheck: true,
},
```

#### vue-cli npm run build空白页的两个坑 

1. dist/index.htmnl文件整个网页都是一片空白的。  打开调试，发现有一排报错说是：`不能加载到资源`。

   ```js
   //更改build里面的assetsPublicPath属性： 
   
   assetsPublicPath:'/'//false 
   
   assetsPublicPath:'./'//true 
   ```

    http-proxy-middleware   config/index.js 