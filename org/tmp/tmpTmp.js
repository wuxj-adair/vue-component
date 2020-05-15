function copy(resource) {
  if (typeof resource != "object") {
    return
  }
  let isObject = Object.prototype.toString.call(resource) == "[object Object]"

  let target = isObject ? {} : []
  for (let it in resource) {

    if (typeof resource != "object") {
      target[it] = copy(resource[it])
    } else {
      target[it] = resource[it]
    }
  }
  return target
}
let a = copy({ a: 3, c: 6, g: 0 })
console.log(a)

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

