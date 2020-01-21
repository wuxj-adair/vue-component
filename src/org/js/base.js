let jsBase = {
        /**
     * 获取url参数值
     * @param {String} key url参数中键
     * @param {Number} valueDefault 没有值时默认返回的值
     * @return {Number} 返回url参数值
     */
    getQueryString:function(key,valueDefault=null) {
        const paramsArr = window.location.search.substr(1).split('&');
        for (let i = 0; i < paramsArr.length; i++) {
            if (key == paramsArr[i].split('=')[0]) {
                return decodeURI(paramsArr[i].split('=')[1]);
            }
        }
        return valueDefault;
    },
    /**
     * 产生随机整数，包含下限值，包括上限值
     * @param {Number} lower 下限
     * @param {Number} upper 上限
     * @return {Number} 返回在下限到上限之间的一个随机整数
     */
    random: function (lower, upper) {
        //Math.random():返回介于 0（包含） ~ 1（不包含） 之间的一个随机数
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    },
}