window.location
用该属性获取页面 URL 地址
包含的属性 

| 属性     | 描述                              |
| -------- | --------------------------------- |
| hash     | 从井号 (#) 开始的 URL（锚）       |
| host     | 主机名和当前 URL 的端口号         |
| hostname | 当前 URL 的主机名                 |
| href     | 完整的 URL                        |
| pathname | 当前 URL 的路径部分               |
| port     | 当前 URL 的端口号                 |
| protocol | 当前 URL 的协议                   |
| search   | 从问号 (?) 开始的 URL（查询部分） |

```js
function getQueryString(name, valueDefault = null) {
    let urlParams = window.location.search.substr(1).split("&");
    for (let it of urlParams) {
        let itParam = it.split("=");
        if (itParam[0] == name) {
            return itParam[1]
        }
    }
    return valueDefault;
}
var uid=getQueryString("uid")
```



