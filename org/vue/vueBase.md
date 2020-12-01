

### MVVM

Model：        数据模型，对应数据层的域模型(融合了行为和数据的域的对象模型)，它主要做域模型的同步。
			          通过 Ajax/fetch 等API 完成客户端和服务端业务 Model 的同步。
View：          动态视图模板，除了定义结构、布局外，它展示的是 ViewModel 层的数据和状态。
                      View 层不负责处理状  态，View 层做的是 数据绑定的声明、 指令的声明、 事件绑定的声明。
ViewModel：连接同步Model和View的对象，监听模型数据的改变和控制视图行为、处理用户交互。
					 把 View 需要的层数据暴露，并对 View 层的 数据绑定声明、 指令声明、 事件绑定声明 负责，
                     也就是处理 View 层的具体业务逻辑。
                     ViewModel 底层会做好绑定属性的监听，当 ViewModel 中数据变化，View 层会得到更新；而当 View 中声				     明了数据的双向绑定（通常是表单元素），框架也会监听 View 层（表单）值的变化。
					 一旦值变化，View 层 绑定的 ViewModel 中的数据也会得到自动更新。

### VUE

​		Vue.js通过响应式在修改数据的时候更新视图。Vue.js的响应式原理依赖于[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)。Vue通过设定对象属性的 setter/getter 方法来监听数据的变化，通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。

​		为了便于理解，首先考虑一种最简单的情况，不考虑数组等情况，代码如下。
​		在[initData](https://github.com/vuejs/vue/blob/dev/src/core/instance/state.js#L107)中会调用[observe](https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js#L106)这个函数将Vue的数据设置成observable的。当_data数据发生改变的时候就会触发set，对订阅者进行回调（在这里是render）。

```js
function observe(value, cb) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
}

function defineReactive (obj, key, val, cb) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            /*....依赖收集等....*/
            /*Github:https://github.com/answershuto*/
            return val
        },
        set:newVal=> {
            val = newVal;
            cb();/*订阅者收到消息的回调*/
        }
    })
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observe(this._data, options.render)
    }
}

let app = new Vue({
    el: '#app',
    data: {
        text: 'text',
        text2: 'text2'
    },
    render(){
        console.log("render");
    }
})
```

​		那么问题来了，需要对app._data.text操作才会触发set。需要一种方便的方法通过app.text直接设置就能触发set对视图进行重绘。那么就需要用到代理。

### 代理

​		在Vue的构造函数constructor中为data执行一个代理[proxy](https://github.com/vuejs/vue/blob/dev/src/core/instance/state.js#L33)。这样就把data上面的属性代理到了vm实例上。就可以用app.text代替app._data.text了。

```javascript
_proxy.call(this, options.data);/*构造函数中*/

/*代理*/
function _proxy (data) {
    const that = this;
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter () {
                return that._data[key];
            },
            set: function proxySetter (val) {
                that._data[key] = val;
            }
        })
    });
}
```

​		如下代码，按照上面的方法进行绑定则会出现一个问题——text3在实际模板中并没有被用到，然而当text3的数据被修改（this.text3 = 'test'）的时候，同样会触发text3的setter导致重新执行渲染，这显然不正确。所以需要进行依赖收集

```javascript
new Vue({
    template: 
        `<div>
            <span>text1:</span> {{text1}}
            <span>text2:</span> {{text2}}
        <div>`,
    data: {
        text1: 'text1',
        text2: 'text2',
        text3: 'text3'
    }
});
```



### 依赖收集

#### Dep

​		当对data上的对象进行修改值的时候会触发它的setter，那么取值的时候自然就会触发getter事件，所以我们只要在最开始进行一次render，那么所有被渲染所依赖的data中的数据就会被getter收集到Dep的subs中去。在对data中的数据进行修改的时候setter只会触发Dep的subs的函数。

```javascript
//依赖收集类Dep
class Dep {
    constructor () {
        this.subs = [];
    }

    addSub (sub: Watcher) {
        this.subs.push(sub)
    }

    removeSub (sub: Watcher) {
        remove(this.subs, sub)
    }
    /*Github:https://github.com/answershuto*/
    notify () {
        // stabilize the subscriber list first
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}
function remove (arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
```

#### Watcher

​		订阅者，当依赖收集的时候会addSub到sub中，在修改data中数据的时候会触发dep对象的notify，通知所有Watcher对象去修改对应视图。

```javascript
class Watcher {
    constructor (vm, expOrFn, cb, options) {
        this.cb = cb;
        this.vm = vm;

        /*在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集*/
        Dep.target = this;
        /*Github:https://github.com/answershuto*/
        /*触发渲染操作进行依赖收集*/
        this.cb.call(this.vm);
    }

    update () {
        this.cb.call(this.vm);
    }
}
```

#### 开始依赖收集

​		将观察者Watcher实例赋值给全局的Dep.target，然后触发render操作只有被Dep.target标记过的才会进行依赖收集。有Dep.target的对象会将Watcher的实例push到subs中，在对象被修改触发setter操作的时候dep会调用subs中的Watcher实例的update方法进行渲染。

```javascript
class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data, options.render);
        let watcher = new Watcher(this, );
    }
}

function defineReactive (obj, key, val, cb) {
    /*在闭包内存储一个Dep对象*/
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            if (Dep.target) {
                /*Watcher对象存在全局的Dep.target中*/
                dep.addSub(Dep.target);
            }
        },
        set:newVal=> {
            /*只有之前addSub中的函数才会触发*/
            dep.notify();
        }
    })
}

Dep.target = null;
```

### Vue源码数据绑定

​		下图比较清晰地展示了整个流程，首先通过一次渲染操作触发Data的getter（这里保证只有视图中需要被用到的data才会触发getter）进行依赖收集，这时候其实Watcher与data可以看成一种被绑定的状态（实际上是data的闭包中有一个Deps订阅者，在修改的时候会通知所有的Watcher观察者），在data发生变化的时候会触发它的setter，setter通知Watcher，Watcher进行回调通知组件重新渲染的函数，之后根据diff算法来决定是否发生视图的更新。
​		Vue在初始化组件数据时，在生命周期的[beforeCreate](https://github.com/vuejs/vue/blob/dev/src/core/instance/init.js#L55)与[created](https://github.com/vuejs/vue/blob/dev/src/core/instance/init.js#L59)钩子函数之间实现了对[data、props、computed、methods、events以及watch](https://github.com/vuejs/vue/blob/dev/src/core/instance/state.js#L43)的处理。

![Vue.js官网介绍响应式原理](.\resource\vueBase\data.png)

#### initData

initData主要是初始化data中的数据，将数据进行Observer，监听数据的变化。

#### proxy

proxy代理，通过proxy函数将data上面的数据代理到vm上，这样就可以用app.text代替app._data.text了。

#### observe

Vue的响应式数据都会有一个__ob__的属性作为标记，里面存放了该属性的观察器，也就是Observer的实例，防止重复绑定。

#### Observer

​		Observer的作用就是遍历对象的所有属性将其进行双向绑定。如果是对象则进行深度遍历，为每一个子对象都绑定上方法，如果是数组则为每一个成员都绑定上方法。如果是修改一个数组的成员，该成员是一个对象，那只需要递归对数组的成员进行双向绑定即可。
​		但这时候出现了一个问题：如果我们进行pop、push等操作的时候，push进去的对象根本没有进行过双向绑定，更别说pop了，那么我们如何监听数组的这些变化呢？ Vue.js提供的方法是重写push、pop、shift、unshift、splice、sort、reverse这七个数组方法。
​		从数组的原型新建一个Object.create(arrayProto)对象，通过修改此原型可以保证原生数组方法不被污染。如果当前浏览器支持__proto__这个属性的话就可以直接覆盖该属性则使数组对象具有了重写后的数组方法。如果没有该属性的浏览器，则必须通过遍历def所有需要重写的数组方法，这种方法效率较低，所以优先使用第一种。

在保证不污染不覆盖数组原生方法添加监听，主要做了两个操作，第一是通知所有注册的观察者进行响应式处理，第二是如果是添加成员的操作，需要对新成员进行observe。

但是修改了数组的原生方法以后我们还是没法像原生数组一样直接通过数组的下标或者设置length来修改数组，可以通过[Vue.set以及splice方法](https://cn.vuejs.org/v2/guide/list.html#替换数组)。

#### Watcher

[Watcher](https://github.com/vuejs/vue/blob/dev/src/core/observer/watcher.js#L24)是一个观察者对象。依赖收集以后Watcher对象会被保存在Deps中，数据变动的时候会由Deps通知Watcher实例，然后由Watcher实例回调cb进行视图的更新。

#### Dep

[Dep](https://github.com/vuejs/vue/blob/dev/src/core/observer/dep.js#L12)类，其实Dep就是一个发布者，可以订阅多个观察者，依赖收集之后Deps中会存在一个或多个Watcher对象，在数据变更的时候通知所有的Watcher。

#### defineReactive

 defineReactive的作用是通过Object.defineProperty为数据定义上getter\setter方法，进行依赖收集后闭包中的Deps会存放Watcher对象。触发setter改变数据的时候会通知Deps订阅者通知所有的Watcher观察者对象进行试图的更新。

如果是修改一个数组的成员，该成员是一个对象，那只需要递归对数组的成员进行双向绑定即可。但这时候出现了一个问题：如果我们进行pop、push等操作的时候，push进去的对象根本没有进行过双向绑定，更别说pop了，那么我们如何监听数组的这些变化呢？ Vue.js提供的方法是重写push、pop、shift、unshift、splice、sort、reverse这七个[数组方法](http://v1-cn.vuejs.org/guide/list.html#变异方法)。修改数组原型方法的代码可以参考[observer/array.js](https://github.com/vuejs/vue/blob/dev/src/core/observer/array.js)以及[observer/index.js](https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js#L45)。

### 生命周期

1. 首先需要创建一个实例，也就是在 new Vue ( ) 的对象过程当中，首先执行了init（init是vue组件里面默认去执行的），在init的过程当中首先调用了beforeCreate，然后在injections（注射）和reactivity（反应性）的时候，它会再去调用created。
   所以在init的时候，事件已经调用了，我们在beforeCreate的时候千万不要去修改data里面赋值的数据，最早也要放在created里面去做（添加一些行为）。

2. 当created完成之后，它会去判断instance（实例）里面是否含有“el”option（选项），如果没有的话，它会调用vm.$mount(el)这个方法，然后执行下一步；如果有的话，直接执行下一步。紧接着会判断是否含有“template”这个选项，如果有的话，它会把template解析成一个render function ，这是一个template编译的过程，结果是解析成了render函数：

   ```js
   render (h) {
     return h('div', {}, this.text)
   }
   ```

   render函数里面的传参h就是Vue里面的createElement方法，return返回一个createElement方法，

   其中要传3个参数：
   第一个参数就是创建的div标签；
   第二个参数传了一个对象，对象里面可以是我们组件上面的props，或者是事件之类的东西；
   第三个参数就是div标签里面的内容，这里我们指向了data里面的text。
   render函数是发生在beforeMount和mounted之间的，说明在beforeMount的时候，$el还只是我们在HTML里面写的节点，然后到mounted的时候，它就把渲染出来的内容挂载到了DOM节点上。这中间的过程其实是执行了render function的内容。

   在使用.vue文件开发的过程当中，我们在里面写了template模板，在经过了vue-loader的处理之后，就变成了render function，最终放到了vue-loader解析过的文件里面。
   这样做有什么好处呢？原因是由于在解析template变成render function的过程，是一个非常耗时的过程，vue-loader帮我们处理了这些内容之后，当我们在页面上执行vue代码的时候，效率会变得更高

3. renderError：在开发的时候它才会被调用，在正式打包上线的过程当中，它是不会被调用的。帮助我们调试render里面的一些错误。有且只有当render方法里面报错了，才会执行renderError方法。

   

   ```js
   renderError (h, err) {
     return h('div', {}, err.stack)
   }
   ```



### Vue-router

#### [#](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#路由懒加载)路由懒加载

```js
export default [
  {
    path: '/caseDetail',
    name: 'CaseDetail',
    component: (resolve) => require(['@/views/caseDetail/caseDetail'], resolve),
  }
]

```

#### 导航

`router.push` ：这个方法会向 history 栈添加一个新的记录。
 当你点击 ` <router-link> ` 时，这个方法会在内部调用，所以说，点击 ` <router-link :to="..."> ` 等同于调用 `router.push(...)`。

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

```js
//该方法的参数可以是一个字符串路径，或者一个描述地址的对象
//如果提供了 path，params 会被忽略。
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

router.replace:  替换掉当前的 history 记录。 

####      导航钩子

​		 钩子（hook）就是一些具有既定生命周期的框架工具，在生命周期的各个阶段预留给用户执行一些特定操作的口		 子，这其实是一种**面向切面编程** 

#####   1.全局导航守卫与钩子

######  		前置守卫与后置钩子 

 			后置钩子不会接受 `next` 函数也不会改变导航本身： 

```js
import router from './router'
router.beforeEach((to,from,next) => {
    //to: Route: 即将要进入的目标路由对象
	//from: Route: 当前导航正要离开的路由
	//next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  if(!navigator.onLine) {
    Toast(utils.toastconfig('请确保设备已成功连接网络'));
    return;
  }
  next();
})
router.afterEach((to,from,next) => {
  //后置钩子不会接受 `next` 函数也不会改变导航本身
  //每次切换页面的时候，让页面滚动到最顶部
  window.scrollTo(0,0);
})

```

##### 2.单独路由独享的守卫

```js
{
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter(to, from, next) {
        if (window.localStorage.getItem("id")) {
            next()
        } else {
            next({ name: "login" })
        }
    }
}
```

##### 3.组件内的守卫

```js
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
```

##### [#](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#完整的导航解析流程)完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。



### 指令

#### 自定义指令

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。
- binding：一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

##### 1.局部注册指令

```vue
 <div v-resize="resizeFun"></div>
```

```js
export default {
  ...
  directives: {
    // 使用局部注册指令的方式
    resize: {
      // 指令的名称
      bind(el, binding) {
        // el为绑定的元素，binding为绑定给指令的对象
        let width = "",
          height = "";
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value(); // 关键
          }
          width = style.width;
          height = style.height;
        }
        el.__vueSetInterval__ = setInterval(isReize, 300);
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__);
      }
    }
  }
};
```

```vue
<input v-focus>
```

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

2. ##### 全局注册指令 

```vue
<input v-focus>
```

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

