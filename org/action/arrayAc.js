/*
 * @Author: your name
 * @Date: 2020-05-07 11:48:29
 * @LastEditTime: 2020-05-07 15:01:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\org\action\arrayAc.js
 */
//http://louiszhai.github.io/2017/04/28/array/#Array构造器
var arr = [1, 2, 3]
arr.push()
arr.pop(4)
arr.shift()
arr.unshift(0)
var arr2 = arr.concat([4, 6, 8])
var arr3 = arr2

arr3.reverse();
arr3.splice(1, 2, 12, 14)

console.log(arr3.indexOf(12), arr3.join("&&"))

arr3.forEach(function (item, index, array) {
    console.log("foeEach",item, index, array)
})

var arr4 = arr3.map(function (item, index, array) {
    return item + 1
})
var arr5 = arr3.map(function (item, index, array) {
    return index * 100
})

let some=arr3.some(function(item,index,array){
    return item>2
})
console.log("some",some)

let every=arr3.every(function(item,index,array){
    return item>2
})
console.log("every",every)

let filter=arr3.filter(function(item,index,array){
    return item>2
})
console.log("filter",filter)

console.log("is array:",Array.isArray(arr5),Object.prototype.toString.call(arr5),arr5.constructor===Array,arr3 instanceof Array)

console.log("arr, arr2, arr3, arr4, arr5",arr, arr2, arr3, arr4, arr5)
