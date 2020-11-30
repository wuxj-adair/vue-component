class Dep {
    constructor () {
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

class Watcher {
    constructor () {
        //dep.target = this是把dep.target指向new出来的Watcher实例本身。
        Dep.target = this;
    }

    update () {
        console.log("视图更新啦～");
    }
}

function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }
    
    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function defineReactive (obj, key, val) {
    //首先我们来实现一个订阅者 Dep ，它的主要作用是用来存放 Watcher 观察者对象。
    const dep = new Dep();
    
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            //Dep.target是引用的，目的是将当前这个Watcher收集到所有依赖的Dep中去。例子中只有一个，是为了便于理解，实际上可能会不止一个Dep去收集同一个Watcher的。
            //dep.addSub(Dep.target) 为什么不用 dep.addSub(new Watcher())
            //因为实际上一个Watcher对象可能会在多个Sub中的哟～
            //在这里的watcher对象是对应视图的，同样的watcher对象在实际上被push进去的时候会检查是否已经存在，不会多个重复的放在同一个dep中的。然后同一个属性是可能对应多个视图的更新的，最常见就是在使用vuex的时候全局store对应在多个视图中体现。
            //实际上是有去重的逻辑的，这些逻辑对于理解原理是多余的所以我省略了。回答一下你的疑问：Watcher是有一个id属性的，每个Watcher的id是不一样的，用这个id就可以去重，在被push进去之前会先看看是否已经有相同id的Watcher存在即可～
           //data是Obj的实际上是递归调用执行的，Dep.target你可以想象一下一个Watcher对象在多个Dep中的场景，可以参考vuex场景。
            //一个对象属性对应一个dep，一个dep对应多个watcher(一个对象属性可能再多个标签使用，那么就会有对应多个watcher，这些watcher都会放入到这个对象属性唯一对应的dep中)，这是Vue1.0的实现，但数据过大时，就会有很多个watcher，就会出现性能问题；所以在Vue2.0中引入的VDOM，给每个vue组件绑定一个watcher，这个组件上的数据的dep中都包含有该watcher，当该组件数据发生变化时，就会通知watcher触发update方法，生成VDOM，和旧的VDOM进行比较，更新改变的部分，极大的减少了watcher的数量，优化了性能；（所以，在Vue2.0中是一个组件对应一个watcher）
            dep.addSub(Dep.target);
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        console.log('render~', this._data.test);
    }
}

let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello,test.";

Dep.target = null;