/*
 * @Author: your name
 * @Date: 2020-03-18 11:04:36
 * @LastEditTime: 2020-03-18 11:05:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\vue\nextTick.js
 * https://github.com/answershuto/VueDemo/blob/master/%E3%80%8A%E6%89%B9%E9%87%8F%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E7%AD%96%E7%95%A5%E5%8F%8A%20nextTick%20%E5%8E%9F%E7%90%86%E3%80%8B.js
 */
let uid = 0;

class Watcher {
    constructor() {
        this.id = ++uid;
    }

    update() {
        console.log('watch' + this.id + ' update');
        queueWatcher(this);
    }

    run() {
        console.log('watch' + this.id + '视图更新啦～');
    }
}

let callbacks = [];
let pending = false;

function nextTick(cb) {
    callbacks.push(cb);

    if (!pending) {
        pending = true;
        setTimeout(flushCallbacks, 0);
    }
}

function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}

let has = {};
let queue = [];
let waiting = false;

function flushSchedulerQueue() {
    let watcher, id;

    for (index = 0; index < queue.length; index++) {
        watcher = queue[index]
        id = watcher.id;
        has[id] = null;
        watcher.run();
    }

    waiting = false;
}

function queueWatcher(watcher) {
    const id = watcher.id;
    if (has[id] == null) {
        has[id] = true;
        queue.push(watcher);

        if (!waiting) {
            waiting = true;
            nextTick(flushSchedulerQueue);
        }
    }
}

(function () {
    let watch1 = new Watcher();
    let watch2 = new Watcher();

    watch1.update();
    watch1.update();
    watch2.update();
})(); 
