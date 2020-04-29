function copy(obj) {
    let co;
    if (typeof obj== 'object') {
        co = Object.prototype.toString.call(obj) === "[Object Object]" ? [] : {}
        obj.forEach(function(item, index){
            return copy(item)

        })
    }
    else {
        return obj
    }
}
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

let source={
    a:2,
    b:{
        c:3
    }
}
let tar=copy(source)
tar.b.c=5
console.log(tar)
console.log(source)
