//原始数据类型：Boolean、Null、Undefined、Number、String、Symbol(ES6)。
//引用数据类型：Object 、Array 、Function 、Data等
// 浅拷贝：创建一个新的对象，把原有的对象属性值，完整地拷贝过来。其中包括了原始类型的值，还有引用类型的内存地址。
//         Object.assign()
//         Array.prototype.slice()
//         Array.prototype.concat()
//         扩展运算符


// 深拷贝：拷贝所有的属性值，以及属性地址指向的值的内存空间。也就是说，当遇到对象时，就再新开一个对象，然后将第二层源对象的属性值，完整地拷贝到这个新开的对象中。
//         JSON.parse(JSON.stringify(obj));


function deepClone(obj) {
    if (!obj && typeof obj !== 'object') {
        return;
    }
    var newObj = toString.call(obj) === '[object Array]' ? [] : {};
    for (var key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            newObj[key] = deepClone(obj[key]);
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}