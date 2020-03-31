/*
 * @Author: your name
 * @Date: 2020-03-30 11:47:40
 * @LastEditTime: 2020-03-30 11:48:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\step\promise copy.js
 */
function JPromise(fn) {
  let state = 'pending';
  let deferred = null;
  let value = null;
  function resolve(newVal) {
      value = newVal;
      state = 'resolved';
      if (deferred) {
          handle(deferred);
      }
  }
  function reject(reason) {
      state = 'rejected';
      value = reason;
      if (deferred) {
          handle(deferred);
      }
  }
  function handle(handler) {
      if (state === 'pending') {
          deferred = handler;
          return;
      }

      let handlerCallback;

      if (state === 'resolved') {
          handlerCallback = handler.onResolved;
      } else {
          handlerCallback = handler.onRejected;
      }

      if (!handlerCallback) {
          if (state === 'resolved') {
              handler.resolve(value);
          } else {
              handler.reject(value);
          }
          return;
      }
      setImmediate(() => {
          const ret = handlerCallback(value);
          handler.resolve(ret);
      });

  }
  this.then = function(onResolved, onRejected) {
      return new Promise((resolve, rejected) => {
          handle({
              onResolved,
              onRejected,
              resolve,
              rejected
          });
      });
  };
  fn(resolve, reject);
}
usePromise=new JPromise(function(resolve){
  console.log("111111222")
   resolve("123")
  // setTimeout(function(){
  //     resolve("123")
  // },2000)
}).then(
  function(){
      console.log("then")
  }  
)
// setTimeout(function(){
//     console.log("11111122222")
//     },0)
console.log("11111122222")