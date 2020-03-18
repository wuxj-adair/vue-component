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