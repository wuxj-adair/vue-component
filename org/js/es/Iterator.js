/*
 * @Author: your name
 * @Date: 2020-05-12 16:18:30
 * @LastEditTime: 2020-05-12 17:19:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\org\js\es\Iterator.js
 */
// 默认 Iterator 接口
// Symbol.iterator就是当前数据结构默认的遍历器生成函数。函数返回一个遍历器。
// Iterator为所有数据结构，提供了一种统一的访问机制，即for...of循环。
//当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
// 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
// ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，

let arr = ['hello', 'world'];
let map = arr[Symbol.iterator]();
console.log(map.next(), map.next(), map.next());

let obj = {
    start: [1, 3, 2],
    end: [7, 9, 8],
    [Symbol.iterator]() {
        let self = this;
        let index = 0;
        let arr = self.start.concat(self.end);
        let len = arr.length;
        return {
            next() {
                if (index < len) {
                    return {
                        value: arr[index++],
                        done: false
                    }
                } else {
                    return {
                        value: arr[index++],
                        done: true
                    }
                }
            }
        }
    }
}
for (let key of obj) {
    console.log(key);
}

// let obj2 = { start: [1, 3, 2],
//   end: [7, 9, 8],};
// obj2[Symbol.iterator] = function* () {
//   let result=false;
//   while(!result){
//     yield result=obj2.done;
//   }
//   // yield 1;
//   // yield 2;
//   // yield 3;
// }

// for (let value of obj2) {
//   console.log('value', value);
// }