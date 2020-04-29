### 自动部署

这边用的是gitLab做git服务器，可以配置commit的钩子函数，实现自动部署和线上发布，就相当服务器监听你的提交，在你commit之后，服务器自动执行了一下`npm run build`，放到对应的测试服务器目录，配置文件在根目录下有`.gitlab-ci.yml`文件，起作用的是下边一段代码，`script`是linux脚本，拷贝文件到指定的静态资源CDN目录和web服务器目录，这块知识点是`gitlab-ci 持续集成`，可以关注一下，svn应该也有类似的配置，让运维帮忙给配一下吧。

```js
npm-build-test:
  image: cdn路径
  stage: build
  cache:
    untracked: true
    paths:
      - node_modules/
  before_script:
    - export BI_ENV="test"
  script:
    - "npm install --registry=http://代理地址 --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/" 
    - "npm run build"
    - "rsync -auvz dist/index.html  ip::服务器开发分支目录/trunk/resources/views/index/"
    - "rsync -auvz dist/* 静态资源cdn目录/trunk/bi/"
  only:
    - master  分支名称
```

