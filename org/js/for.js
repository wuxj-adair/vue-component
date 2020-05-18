//for-in 主要用于对象,不过也可以用于数组
let arr = [1, 2, 3]
for (let it in arr) {
    console.log("for in:",it)
}

var obj = {
    objName: "objValue"
}
Object.prototype.objAddIn = "objAddIn"
for (let it in obj) {
    console.log("for in:",it)
    if (obj.hasOwnProperty(it)) {
        console.log("for in:","hasOwnProperty",it, obj[it])
    }
}

//forEach()
//forEach()里调用的是函数，没有break、continue,而return也只是不执行后面的，不会结束forEach 循环，因为forEach的参数是函数
arr.forEach((item, value, arr) => {
    console.log("forEach:", item)
    return;
    console.log("return forEach:", item)
})

//for-of
// for-of循环不仅支持数组，还支持大多数类数组对象，例如DOM NodeList对象。
// 这是最简洁、最直接的遍历数组元素的语法
// 这个方法避开了for-in循环的所有缺陷
// 与forEach()不同的是，它可以正确响应break、continue和return语句
for(it of arr){
    console.log("for of:",it)
}