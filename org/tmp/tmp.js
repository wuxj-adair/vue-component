/*
 * @Author: your name
 * @Date: 2020-03-24 09:21:52
 * @LastEditTime: 2020-04-09 11:34:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\tmp\tmp.js
 */
Array.prototype.set=function(){
    console.log(121)
}
var arr1=[2,3]
for(var a in arr1){
    console.log(a)
}
var message = `The user 1 cannot 
be 3 because 2`;
console.log(message)
var sortArr = [5, 6, 4, 2, 1, 10, 3]
function sort1() {
    for (let i = 0; i <= sortArr.length - 1; i++) {
        for (let j = 0; j <= sortArr.length - 1 - i; j++) {
            if (sortArr[j] > sortArr[j + 1]) {
                [sortArr[j], sortArr[j + 1]] = [sortArr[j + 1], sortArr[j]]
            }
        }
    }
}
function selectionSort(arr) {
    var len = arr.length;
    var minIndex;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数   
                minIndex = j;                 // 将最小数的索引保存   
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr;
}
function insertionSort(arr) {   
    var len = arr.length;   
    var preIndex, current;   
    for (var i = 1; i < len; i++) {   
        preIndex = i - 1;   
        current = arr[i];   
        while(preIndex >= 0 && arr[preIndex] > current) {   
            arr[preIndex+1] = arr[preIndex];   
            preIndex--;   
        }   
        arr[preIndex+1] = current;   
    }   
    return arr;   
}
// sort1()
console.log(selectionSort(sortArr))
var str = "ABCDEF";
console.log(str.substring(-2, -4))
var a = [1, 2, 3]
a.forEach(function (i) {
    if (i == 1) {
        return;
    }
    console.log("i", i)
})
function Sun(a) {
    this.a1 = a
}
Sun.prototype.be = function () {
    console.log(this.a1)
}
let sun = new Sun("123")
sun.be();
function Parent(a, b) {
    Sun.call(this, a)
    this.b = b
}
Parent.prototype = Object.create(Sun.prototype)
Parent.prototype.construct = Parent
Parent.prototype.do = function () {
    console.log(this.a1, this.b)
}
let parent = new Parent("sunP", "sunP2")
console.log(sun instanceof Sun)
console.log(parent instanceof Sun)
console.log(parent instanceof Parent)
parent.do()
// 项目简介： easyview是公司级的前端开发框架，产品供健康，音乐，教育等研发部与运营部使用。
// 	    责任描述： 负责js sdk的制定与开发
// 项目概述： 该平台提供运营部不用写代码就可实现简单业务逻辑的页面;
// 提供产品相关研发组高效，统一地实现不同业务，不同效果的页面。
// 主要负责：1.制定相关api，使用JSDuck构建api文档;
//  		  2.实现js sdk，实现多种组件，数据交互与存储，
// 页面生命周期与路由, 公共对象方法等。