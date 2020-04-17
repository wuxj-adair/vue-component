/*
 * @Author: your name
 * @Date: 2020-03-23 15:41:50
 * @LastEditTime: 2020-04-15 18:06:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\step\promise.js
 */
class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };
    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        // 一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    let promise1 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        onFulfilled(this.value);
        resolvePromise(promise1,x,resolve,reject);
        then.call(x,y => {
          resolve(y);
      },r => {
          reject(r);
      })
      };
      if (this.state === 'rejected') {
        onRejected(this.reason);
        then.call(x,y => {
          resolve(y);
      },r => {
          reject(r);
      })
      };
      // 当状态state为pending时
      if (this.state === 'pending') {
        // onFulfilled传入到成功数组
        this.onResolvedCallbacks.push(() => {
          onFulfilled(this.value);
        })
        // onRejected传入到失败数组
        this.onRejectedCallbacks.push(() => {
          onRejected(this.value);
        })
      }
    })
    return promise1
  }
}

// usePromise=new Promise(function(resolve){
//     console.log("111111222")
//      resolve("123")
//     // setTimeout(function(){
//     //     resolve("123")
//     // },2000)
// }).then(
//     function(){
//         console.log("then")
//     }  
// )
// // setTimeout(function(){
// //     console.log("11111122222")
// //     },0)
// console.log("11111122222")

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('sushengxi');
  }, 2000)

})

let p1 = p.then(data => {
  console.log('p1data11111111', data);
  return [1, 2, 3];
})

p1.then(data => {
  console.log('p1data', data);
}, err => {
  console.log('p1err', err)
})