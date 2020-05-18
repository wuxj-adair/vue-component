
// promise 常量定义状态
const PENNDING = "PENNDING";
const FULFILLD = "FULFILLD";
const REJECTED = "REJECTED";

const resolvePromise = (promise1,x,resolve,reject) => {
    if(promise1 === x) {
        reject(new TypeError('死循环了'));
    } else if(typeof x === 'function' || (typeof x === 'object' && typeof x != null)) {
        let then = x.then;
        if(typeof then === 'function') {
            then.call(x,y => {
                resolvePromise(promise1,y,resolve,reject)
            },r => {
                reject(r);
            })
        } else {
            resolve(x);
        }
    } else {
        resolve(x);
    }
}
class Promise {
    constructor(exector) {
        this.state = PENNDING;
        this.value = undefined;
        this.err = undefined;
        this.onfulfilldcallback = [];
        this.onrejectcallback = [];
        let resolve = (value) => {
             if(this.state === PENNDING) {
                 this.state = FULFILLD;
                 this.value = value;
                 this.onfulfilldcallback.forEach(fn => fn());
             }
        };
        let reject = (err) => {
            if(this.state == PENNDING) {
                this.state = REJECTED;
                this.err = err;
                this.onrejectcallback.forEach(fn => fn());
            } 
        };
        exector(resolve,reject);
    }
    then(onfulfilld,onreject) {
        let promise1 = new Promise((resolve,reject) => {
             if(this.state === FULFILLD) {
                 setTimeout(() => {
                     try {
                        let x = onfulfilld(this.value);
                        resolvePromise(promise1,x,resolve,reject)  
                     } catch (error) {
                         reject(error);
                     }
                 })
             } else if(this.state === REJECTED) {
                 setTimeout(() => {
                     try {
                        let x = onreject(this.value);
                        resolvePromise(promise1,x,resolve,reject);
                     } catch (error) {
                         reject(error)
                     }
                     
                 })
             } else {
                 setTimeout(() => {
                    this.onfulfilldcallback.push(() => {
                        try {
                            let x = onfulfilld(this.value); 
                            resolvePromise(promise1,x,resolve,reject);
                        } catch (error) {
                            reject(error)
                        }
                     })
                 });
                 setTimeout(() => {
                     this.onrejectcallback.push(() => {
                         try {
                             let x = onreject(this.err);
                             resolvePromise(promise1,x,resolve,reject);
                         } catch (error) {
                             reject(error);
                         }
                     })
                 })
             }
        })
        return promise1;
    }
}

let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('Promise:p');
    },2000)  
})

let p1 =p.then(data => {
    //  return [1,2,3];
    console.log(data)
    let p3 = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('Promise:p1'+data);
        },1000)        
    })
    return p3
})

p1.then(data => {
    console.log('p1:data   ',data);
},err => {
    console.log('p1:err  ',err)
})