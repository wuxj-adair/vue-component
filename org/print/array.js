//数组去重 利用对象
let arr = [1, 2, 2, 3];

function distinct(a, b=[]) {
    let arr = a.concat(b)
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }

    return result
}
let newArr = distinct(arr)
let newArr2 = Array.from(new Set(arr));
let newArr3 = [...new Set(arr)];
console.log(arr,newArr, newArr2, newArr3)

//类数组转数组
Array.prototype.slice.call(arrayLike);