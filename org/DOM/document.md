```js
function getCookie(name, valueDefault = null) {
    let cookies = document.cookie.split(';');
    for (let it of cookies) {
        let itCookie = it.split('=')
        if (itCookie[0].trim() === name) {
            return itCookie[1]
        }
    }
    return valueDefault;
}
```

