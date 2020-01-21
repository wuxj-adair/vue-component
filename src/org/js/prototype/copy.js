// https://juejin.im/post/5cab479cf265da039d325df4
// 浅拷贝
//创建一个新的对象，把原有的对象属性值，完整地拷贝过来。其中包括了原始类型的值，还有引用类型的内存地址。
//即只拷贝第一层的原始类型值，和第一层的引用类型地址。
//Object.assign()
//Array.prototype.slice()
//Array.prototype.concat()
//ES6 的 扩展运算符
const obj = {a:1, b:2};
const obj2 = Object.assign({}, obj);

const arr = [1,2,3];
const newArr = [].concat(arr);


//深拷贝
//下面方法会存在引用丢失的的问题,如果我们的需求是，应该丢失引用，那就可以用这个方法。反之，就得想办法解决。
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

let arr = [{a:1,b:2}, {a:3,b:4}];
let newArr = deepClone(arr);

newArr.length = 1; // 为了方便区分，只保留新数组的第一个元素
console.log(newArr); // [{a:1, b:2}]
console.log(arr); // [{a:1, b:2}, {a:3, b:4}]

newArr[0].a = 123; // 修改 newArr 中第一个元素的 a
console.log(arr[0]); // {a:1, b:2}

//这个方法会存在引用丢失的的问题。
var b = {};
var a = {a1: b, a2: b};
a.a1 === a.a2 // true
var c = clone(a);
c.a1 === c.a2 // false

// JSON.parse(JSON.stringify(obj))
// 但是，JSON 内部用了递归的方式。数据一但过多，就会有递归爆栈的风险。
let newArr2 = JSON.parse(JSON.stringify(arr));
console.log(arr[0]); // {a:1, b:2}
newArr2[0].a = 123;
console.log(arr[0]); // {a:1, b:2}
