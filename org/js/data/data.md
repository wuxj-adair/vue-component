 

[存储]: https://juejin.im/post/5e893002f265da48094d8cd3

目前，可用的持久化方案可选项也比较多了，主要有：Cookie、localStorage、sessionStorage、IndexedDB、webSQL 、FileSystem 等等。那么该如何选择呢？我们通过一个表来进行对比：

| **存储方式** | cookie | localStorage | sessionStorage | IndexedDB  | webSQL | FileSystem |
| :----------- | :----- | :----------- | :------------- | :--------- | :----- | :--------- |
| **类型**     |        | key-value    | key-value      | NoSQL      | SQL    |            |
| **数据格式** | string | string       | string         | object     |        |            |
| **容量**     | 4k     | 5M           | 5M             | 500M       | 60M    |            |
| **进程**     | 同步   | 同步         | 同步           | 异步       | 异步   |            |
| **检索**     |        | key          | key            | key, index | field  |            |
| **性能**     |        | 读快写慢     |                | 读慢写快   |        |            |

 综合之后，IndexedDB是最好的选择，它具有容量大、异步的优势，异步的特性保证它不会对界面的渲染产生阻塞。而且IndexedDB是分库的，每个库又分store，还能按照索引进行查询，具有完整的数据库管理思维，比localStorage更适合做结构化数据管理。但是它有一个缺点，就是api非常复杂，不像localStorage那么简单直接。针对这一点，我们可以使用hello-indexeddb这个工具，它用Promise对复杂api进行来封装，简化操作，使IndexedDB的使用也能做到localStorage一样便捷。另外，IndexedDB是被广泛支持的HTML5标准，兼容大部分浏览器，因此不用担心它的发展前景。 

![](F:\gitW\vue-component-book-master\org\js\data\data.webp.jpg)

#### Cookie 和 Session

HTTP 协议是一种`无状态协议`，即每次服务端接收到客户端的请求时，都是一个全新的请求，服务器并不知道客户端的历史请求记录；Session 和 Cookie 的主要目的就是为了弥补 HTTP 的无状态特性。

#### Session 

客户端请求服务端，服务端会为这次请求开辟一块`内存空间`，这个对象便是 Session 对象，存储结构为 `ConcurrentHashMap`。Session 弥补了 HTTP 无状态特性，服务器可以利用 Session 存储客户端在同一个会话期间的一些操作记录。

内存分配的空间一般分为六个区。常量代码区、数据段区、BSS段、堆空间、栈空间以及内存空间。内存空间是从下向上增长的。
（1）、常量区：用来存放代码和常量

（2）、数据段：用来存放初始化的静态变量和全局变量

（3）、bss段：用来存放未初始化的静态变量和全局变量

（4）、堆空间：动态malloc申请的空间，引用的变量实例化存储的空间s

（5）、栈空间：用来存放局部变量，形参之类，未进行实例化的引用申请的变量

（6）、内核空间：用来存放内核代码和环境变量