let Promise = require('./promise');
// const fs = require('fs').promises;
const isPromise = (val) => {
    if ((typeof val === 'object' && val != null) || typeof val === 'function') {
        return typeof val.then === 'function';
    } else {
        return false;
    }
}
Promise.all = function (promies) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let i = 0;
        const processData = (index, data) => {
            arr[index] = data;
            if (++i === promies.length) {
                resolve(arr);
            }

        }
       
        for (let i = 0; i < promies.length; i++) {
            if (isPromise(promies[i])) {
                let current = promies[i];
                current.then(data => {
                    processData(i,data)
                },err => {
                    reject(err);
                })
            } else {
                processData(i,promies[i])
            }
        }
    })
}

Promise.all([fs.readFile('./age.txt','utf8'),fs.readFile('./school.txt','utf8'),1]).then(data => {
    console.log(data);
})