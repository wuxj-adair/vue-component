序列化
序列化的作用是存储和传输：
	存储(对象本身存储的只是一个地址映射，如果断电，对象将不复存在，因此需将对象的内容转换成字符串的形式再保存在磁盘上)
	传输（例如 如果请求的Content-Type是 application/x-www-form-urlencoded，则前端这边需要使用qs.stringify(data)来序列化参数再传给后端，否则后端接受不到；ps:  Content-Type 为 application/json;charset=UTF-8或者 multipart/form-data 则可以不需要）