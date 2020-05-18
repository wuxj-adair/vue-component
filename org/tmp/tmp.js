function getQueryString(name) {
    var urlParams = window.location.search.substr(1).split('&');
    for (var i = 0; i < urlParams.length; i++) {
        if (name == urlParams[i].split('=')[0]) {
            return decodeURI(urlParams[i].split('=')[1]);
        }
    }
    return "";
}

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


// getQueryString(key,valueDefault=null) {
//     const paramsArr = window.location.search.substr(1).split('&');
//     for (let i = 0; i < paramsArr.length; i++) {
//         if (key == paramsArr[i].split('=')[0]) {
//             return decodeURI(paramsArr[i].split('=')[1]);
//         }
//     }
//     return valueDefault;
// },