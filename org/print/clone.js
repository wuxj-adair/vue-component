/*
 * @Author: your name
 * @Date: 2020-05-14 15:56:29
 * @LastEditTime: 2020-05-18 13:49:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\org\print\clone.js
 */ 
//该方法存在引用丢失的问题
function deepClone(obj) {
    if(!obj && typeof obj !== 'object'){
        return;
    }
    var newObj= toString.call(obj) === '[object Array]' ? [] : {};
    for (var key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            newObj[key] = deepClone(obj[key]);
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
  }

var b = {};
var a = {a1: b, a2: b};
console.log(a.a1 === a.a2)// true
var c = deepClone(a);
console.log(c.a1 === c.a2) // false
