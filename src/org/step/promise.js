/*
 * @Author: your name
 * @Date: 2020-03-23 15:41:50
 * @LastEditTime: 2020-03-23 16:13:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\step\promise.js
 */
class Promise {
    constructor(executor) {
        // 初始化state为等待态
        this.state = 'pending';
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;
        let resolve = value => {
            console.log("in resolve")
            // state改变,resolve调用就会失败
            if (this.state === 'pending') {
                // resolve调用后，state转化为成功态
                this.state = 'fulfilled';
                // 储存成功的值
                this.value = value;
            }
        };
        let reject = reason => {
            console.log("in reject")
            // state改变,reject调用就会失败
            if (this.state === 'pending') {
                // reject调用后，state转化为失败态
                this.state = 'rejected';
                // 储存失败的原因
                this.reason = reason;
            }
        };
        // 如果executor执行报错，直接执行reject
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    // then 方法 有两个参数onFulfilled onRejected
    then(onFulfilled,onRejected) {
        // 状态为fulfilled，执行onFulfilled，传入成功的值
        if (this.state === 'fulfilled') {
          onFulfilled(this.value);
        };
        // 状态为rejected，执行onRejected，传入失败的原因
        if (this.state === 'rejected') {
          onRejected(this.reason);
        };
      }
}

function wantUsePromise(resolve) {
    console.log("wantUsePromise")
    resolve();
}
function thenDosomething(resolveData) {
    console.log("in thenDosomething resolveData:"+resolveData)
}
let promise=new Promise(wantUsePromise)

promise.then(thenDosomething)