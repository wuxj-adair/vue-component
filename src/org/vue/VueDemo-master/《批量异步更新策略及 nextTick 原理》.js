/*
 * @Author: your name
 * @Date: 2020-03-30 14:41:25
 * @LastEditTime: 2020-03-30 16:32:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\org\vue\VueDemo-master\《批量异步更新策略及 nextTick 原理》.js
 */
let uid = 0;

class Watcher {
    constructor () {
        this.id = ++uid;
    }

    update () {
        console.log('watch' + this.id + ' update');
        queueWatcher(this);
    }

    run () {
        console.log('watch' + this.id + '视图更新啦～');
    }
}

let callbacks = [];
let pending = false;

function nextTick (cb) {
    callbacks.push(cb);

    if (!pending) {
        pending = true;
        setTimeout(flushCallbacks, 0);
    }
}

function flushCallbacks () {
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

function flushSchedulerQueue () {
    let watcher, id;

    for (index = 0; index < queue.length; index++) {
        watcher = queue[index]
        id = watcher.id;
        has[id] = null;
        watcher.run();
    }

    waiting  = false;
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
    //  watch1.update();
    // watch2.update();
    setTimeout(function(){
        watch1.update();
    },0)
})();