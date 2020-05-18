//数组去重 利用对象
let arr = [1, 2, 2, 3];
let newArr = Array.from(new Set(arr));
function distinct(a, b) {
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

//类数组转数组
Array.prototype.slice.call(arrayLike);