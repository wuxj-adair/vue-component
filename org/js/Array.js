// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
// (array与string记忆：slice:片; 部分;splice:胶接，粘接;split:分离,划分)

//arr.sort([compareFunction])
//返回值:排序后的数组
//用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

// 如果没有指明 compareFunction ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。
// 例如 "Banana" 会被排列到 "cherry" 之前。
// 当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFunction），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。
// 如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。
// 即 a 和 b 是两个将要被比较的元素：
// 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
// 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
// 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
// compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

//要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列
function compareNumbers(a, b) {
    return a - b;
}


//array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
//通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
//返回值:由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');// inserts at index 1
console.log(months);// expected output: Array ["Jan", "Feb", "March", "April", "June"]


//arr.slice([begin[, end]])
//返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));// expected output: Array ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));// expected output: Array ["camel", "duck"]