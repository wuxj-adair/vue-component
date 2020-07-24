## MVVM : Model-View-ViewModel

Model：数据模型，在Model中定义数据修改和操作的业务逻辑。
View：UI组件，将数据模型转化成UI展现出来。
ViewModel：监听模型数据的改变和控制视图行为、处理用户交互，就是一个同步View 和 Model的对象，连接Model和View。

Model 层: 对应数据层的域模型(融合了行为和数据的域的对象模型)，它主要做域模型的同步。通过 Ajax/fetch 等 API 完成客户端和服务端业务 Model 的同步。
在层间关系里，它主要用于抽象出 ViewModel 中视图的 Model。
View 层:动态视图模板。除了定义结构、布局外，它展示的是 ViewModel 层的数据和状态。View 层不负责处理状态，View 层做的是 数据绑定的声明、 指令的声明、 事件绑定的声明。
ViewModel 层:把 View 需要的层数据暴露，并对 View 层的 数据绑定声明、 指令声明、 事件绑定声明 负责，也就是处理 View 层的具体业务逻辑。
ViewModel 底层会做好绑定属性的监听。
当 ViewModel 中数据变化，View 层会得到更新；
而当 View 中声明了数据的双向绑定（通常是表单元素），框架也会监听 View 层（表单）值的变化。一旦值变化，View 层绑定的 ViewModel 中的数据也会得到自动更新。

## vue

#### 生命周期

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


## 机制

<img src="https://user-gold-cdn.xitu.io/2017/12/19/1606e7eaa2a664e8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" alt="img" style="zoom: 50%;" />





### 初始化及挂载

在 `new Vue()` 之后。 Vue 会调用 `_init` 函数进行初始化，也就是这里的 `init` 过程，它会初始化生命周期、事件、 props、 methods、 data、 computed 与 watch 等。其中最重要的是通过 `Object.defineProperty` 设置 `setter` 与 `getter` 函数，用来实现「**响应式**」以及「**依赖收集**」。
初始化之后调用 `$mount` 会挂载组件，如果是运行时编译，即不存在 render function 但是存在 template 的情况，需要进行「**编译**」步骤

### 编译

compile编译可以分成 `parse`、`optimize` 与 `generate` 三个阶段，最终需要得到 render function

#### parse

`parse` 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。

#### optimize

`optimize` 的主要作用是标记 static 静态节点，这是 Vue 在编译过程中的一处优化，后面当 `update` 更新界面时，会有一个 `patch` 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 `patch` 的性能。

### generate

`generate` 是将 AST 转化成 render function 字符串的过程，得到结果是 render 的字符串以及 staticRenderFns 字符串。

在经历过 `parse`、`optimize` 与 `generate` 这三个阶段以后，组件中就会存在渲染 VNode 所需的 render function 了。

### 响应式

这里的 `getter` 跟 `setter` 已经在之前介绍过了，在 `init` 的时候通过 `Object.defineProperty` 进行了绑定，它使得当被设置的对象被读取的时候会执行 `getter` 函数，而在当被赋值的时候会执行 `setter` 函数。

当 render function 被渲染的时候，因为会读取所需对象的值，所以会触发 `getter` 函数进行「**依赖收集**」，「**依赖收集**」的目的是将观察者 Watcher 对象存放到当前闭包中的订阅者 Dep 的 subs 中。形成如下所示的这样一个关系。

![img](https://user-gold-cdn.xitu.io/2017/12/21/160770b2a77e084e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在修改对象的值的时候，会触发对应的 `setter`， `setter` 通知之前「**依赖收集**」得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。这时候这些 Watcher 就会开始调用 `update` 来更新视图，这中间还有一个 `patch` 的过程以及使用队列来异步更新的策略

### Virtual DOM

render function 会被转化成 VNode 节点。Virtual DOM 其实就是一棵以 JavaScript 对象（ VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

比如说下面这样一个例子：

```
{
    tag: 'div',                 /*说明这是一个div标签*/
    children: [                 /*存放该标签的子节点*/
        {
            tag: 'a',           /*说明这是一个a标签*/
            text: 'click me'    /*标签的内容*/
        }
    ]
}
```

渲染后可以得到

```
<div>
    <a>click me</a>
</div>
```

这只是一个简单的例子，实际上的节点有更多的属性来标志节点，比如 isStatic （代表是否为静态节点）、 isComment （代表是否为注释节点）等。

### 更新视图

当数据变化后，执行 render function 就可以得到一个新的 VNode 节点
将新的 VNode 与旧的 VNode 一起传入 `patch` 进行比较，经过 diff 算法得出它们的「**差异**」。最后只需要将这些「**差异**」的对应 DOM 进行修改即可。

响应式系统

```
/*
    obj: 目标对象
    prop: 需要操作的目标对象的属性名
    descriptor: 描述符
    
    return value 传入对象
*/
Object.defineProperty(obj, prop, descriptor)
```

descriptor的一些属性，简单介绍几个属性，具体可以参考 [MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)。

- `enumerable`，属性是否可枚举，默认 false。
- `configurable`，属性是否可以被修改或者删除，默认 false。
- `get`，获取属性的方法。
- `set`，设置属性的方法。

## nextTick

Vue.js 实现了一个 `nextTick` 函数，传入一个 `cb` ，这个 `cb` 会被存储到一个队列中，在下一个 tick 时触发队列中的所有 `cb` 事件。
因为目前浏览器平台并没有实现 `nextTick` 方法，所以 Vue.js 源码中分别用 `Promise`、`setTimeout`、`setImmediate` 等方式在 microtask（或是task）中创建一个事件，目的是在当前调用栈执行完毕以后（不一定立即）才会去执行这个事件。

### ASQ

#### 1.怎么实现 `this._test` 改变而不是 `this._data.test` 改变触发更新？

答：其实这中间有一个**代理**的过程。本质就是通过 `Object.defineProperty` 使在访问 `this` 上的某属性时从 `this._data` 中读取（写入）

```
_proxy(options.data);

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

#### 2.使用 nextTick 将回调延迟到下次 DOM 更新循环之后执行

在某些情况下，我们改变页面中绑定的数据后需要对新视图进行一些操作，而这时候新视图其实还未生成，需要等待 DOM 的更新后才能获取的到，在这种场景下我们便可以使用 nextTick 来延迟回调的执行。

```js
this.$nextTick(() => {
    this.$refs.box.getElementsByTagName('li')[0].innerHTML = 'hello';
})
```

 当然你也可以使用 ES6 的 `async/await` 语法来改写上述方法： 

```js
methods: {
    async getData() {
        this.arr = [1, 2, 3];  
        await this.$nextTick();
        this.$refs.box.getElementsByTagName('li')[0].innerHTML = 'hello';
    }
}
```

Vue 源码中使用了 3 种方式来实现nextTick ：

- promise.then 延迟调用

- setTimeout(func, 0) 延迟功能

- MutationObserver 监听变化

  [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 这一 HTML5 新特性，介绍：我们可以使用它创建一个观察者对象，其会监听某个 DOM 元素，并在它的 DOM 树发生变化时执行我们提供的回调函数。实例化代码及配置如下 

```js
//观察 id 为 box 下的 DOM 树变化，一旦发生变化就会触发相应的回调方法，实现延迟调用的功能。
// 传入回调函数进行实例化
var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        console.log(mutation.type);
    })
});

// 选择目标节点
var target = document.querySelector('#box');
 
// 配置观察选项
var config = { 
    attributes: true, // 是否观察属性的变动
    childList: true, // 是否观察子节点的变动（指新增，删除或者更改）
    characterData: true // 是否观察节点内容或节点文本的变动
};
 
// 传入目标节点和观察选项
observer.observe(target, config);
 
// 停止观察
observer.disconnect();
```

#### 3.使用 watch 的深度遍历和立即调用功能

`watch` 监听数据变化：

- `handler` 函数回调
- deep 设置为 true 用于监听对象内部值的变化
- immediate 设置为 true 将立即以表达式的当前值触发回调

```vue
<!-- 以下代码我们修改了 obj 对象中 a 属性的值，可以触发其 watch 中的 handler 回调输出新的对象，而如果不加 deep: true，我们只能监听 obj 的改变，并不会触发回调。同时我们也添加了 immediate: true 配置，其会立即以 obj 的当前值触发回调。-->
<template>
    <button @click="obj.a = 2">修改</button>
</template>
<script>
export default {
    data() {
        return {
            obj: {
                a: 1,
            }
        }
    },
    watch: {
        obj: {
            handler: function(newVal, oldVal) {
                console.log(newVal); 
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
```

#### 5.对低开销的静态组件使用 v-once

 Vue 提供了 `v-once` 指令用于只渲染元素和组件一次，一般可以用于存在大量静态数据组件的更新性能优化，注意是大量静态数据，因为少数情况下我们的页面渲染会因为一些静态数据而变慢。如果你需要对一个组件使用 v-once，可以直接在组件上绑定：

```vue
<!-- 这时候因为组件绑定了 v-once，所以无论 msg 的值如何变化，组件内渲染的永远是其第一次获取到的初始值。因此我们在使用 v-once 的时候需要考虑该组件今后的更新情况，避免不必要的问题产生。-->
<my-component v-once :data="msg"></my-component>
```

#### 6.Vuex

Vuex 类似 Redux 的**状态管理器**，用来管理**Vue**的所有组件状态。

#### 为什么使用Vuex

当你打算开发大型单页应用（SPA），会出现多个视图组件依赖同一个状态，来自不同视图的行为需要变更同一个状态。遇到以上情况时候，你就应该考虑使用Vuex了，它能把组件的共享状态抽取出来，当做一个全局单例模式进行管理。这样不管你在何处改变状态，都会通知使用该状态的组件做出相应修改。

#### 最简单的Vuex示例

```js
import Vue from 'vue';
import Vuex form 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
```

以上就是一个最简单的Vuex，每一个Vuex应用就是一个store，在store中包含组件中的共享**状态**`state`和改变状态的**方法**（暂且称作方法）`mutations`。

需要注意的是只能通过`mutations`改变store的`state`的状态，不能通过`store.state.count = 5;`直接更改，`state`相当于对外的只读属性。

使用`store.commit`方法触发`mutations`改变`state`:

```js
store.commit('increment');

console.log(store.state.count)  // 1
```

一个简简单单的Vuex应用就实现了。

#### 在Vue组件使用Vuex

如果希望Vuex状态更新，相应的Vue组件也得到更新，最简单的方法就是在Vue的`computed`（计算属性）获取`state`

```js
// Counter 组件
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
            return store.state.count;
        }
    }
}
```

上面的例子是直接操作全局状态`store.state.count`，那么每个使用该Vuex的组件都要引入。为了解决这个，Vuex通过`store`选项，提供了一种机制将状态从根组件**注入**到每一个子组件中。

```js
// 根组件
import Vue from 'vue';
import Vuex form 'vuex';

Vue.use(Vuex);
const app = new Vue({
    el: '#app',
    store,
    components: {
        Counter
    },
    template: `
        <div class="app">
            <counter></counter>
        </div>
    `
})
```

通过这种**注入**机制，就能在子组件`Counter`通过`this.$store`访问：

```js
// Counter 组件
const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
        count () {
            return this.$store.state.count
        }
    }
}
```

### mapState函数

```js
computed: {
    count () {
        return this.$store.state.count
    }
}
```

这样通过`count`计算属性获取同名`state.count`属性，是不是显得太重复了，我们可以使用`mapState`函数简化这个过程。

```js
import { mapState } from 'vuex';

export default {
    computed: mapState ({
        count: state => state.count,
        countAlias: 'count',    // 别名 `count` 等价于 state => state.count
    })
}
```

还有更简单的使用方法：

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

### Getters对象

如果我们需要对`state`对象进行做处理计算，如下：

```js
computed: {
    doneTodosCount () {
        return this.$store.state.todos.filter(todo => todo.done).length
    }
}
```

如果多个组件都要进行这样的处理，那么就要在多个组件中复制该函数。这样是很没有效率的事情，当这个处理过程更改了，还有在多个组件中进行同样的更改，这就更加不易于维护。

Vuex中`getters`对象，可以方便我们在`store`中做集中的处理。Getters接受`state`作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

**在Vue中通过`store.getters`对象调用。**

```js
computed: {
  doneTodos () {
    return this.$store.getters.doneTodos
  }
}
```

Getter也可以接受其他**getters**作为第二个参数：

```js
getters: {
  doneTodos: state => {
      return state.todos.filter(todo => todo.done)
  },
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

### mapGetters辅助函数

与`mapState`类似，都能达到简化代码的效果。`mapGetters`辅助函数仅仅是将store中的getters映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

上面也可以写作：

```js
computed: mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
```

所以在Vue的`computed`计算属性中会存在两种辅助函数：

```js
import { mapState, mapGetters } form 'vuex';

export default {
    // ...
    computed: {
        mapState({ ... }),
        mapGetter({ ... })
    }
}
```

### Mutations

更改Vuex的store中的状态的唯一方法就是`mutations`。

每一个`mutation`都有一个**事件类型**`type`和一个**回调函数**`handler`。

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

调用`mutation`，需要通过`store.commit`方法调用`mutation type`：

```js
store.commit('increment')
```

#### Payload 提交载荷

也可以向`store.commit`传入第二参数，也就是mutation的`payload`:

```js
mutaion: {
    increment (state, n) {
        state.count += n;
    }
}

store.commit('increment', 10);
```

单单传入一个`n`，可能并不能满足我们的业务需要，这时候我们可以选择传入一个`payload`对象：

```js
mutation: {
    increment (state, payload) {
        state.totalPrice += payload.price + payload.count;
    }
}

store.commit({
    type: 'increment',
    price: 10,
    count: 8
})
```

#### mapMutations函数

不例外，mutations也有映射函数`mapMutations`，帮助我们简化代码，使用`mapMutations`辅助函数将组件中的`methods`映射为`store.commit`调用。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment' // 映射 this.increment() 为 this.$store.commit('increment')
    ]),
    ...mapMutations({
      add: 'increment' // 映射 this.add() 为 this.$store.commit('increment')
    })
  }
}
```

**注** Mutations必须是同步函数。

如果我们需要异步操作，Mutations就不能满足我们需求了，这时候我们就需要`Actions`了。

```
//一般项目中
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    getters
})
```

#### 7.导航

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

### 8.指令

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

### 9.Vue Loader 

Vue Loader 是一个 [webpack](https://webpack.js.org/) 的 loader

```搜索bash
npm install -D vue-loader vue-template-compiler
```

 每个 `vue` 包的新版本发布时，一个相应版本的 `vue-template-compiler` 也会随之发布。编译器的版本必须和基本的 `vue` 包保持同步，这样 `vue-loader` 就会生成兼容运行时的代码。这意味着**你每次升级项目中的 `vue` 包时，也应该匹配升级 `vue-template-compiler`。** 

```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

#### 处理资源路径

##### 转换规则

资源 URL 转换会遵循如下规则：

- 如果路径是绝对路径 (例如 `/images/foo.png`)，会原样保留。
- 如果路径以 `.` 开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析。
- 如果路径以 `~` 开头，其后的部分将会被看作模块依赖。这意味着你可以用该特性来引用一个 Node 依赖中的资源。
- 如果路径以 `@` 开头，也会被看作模块依赖。如果你的 webpack 配置中给 `@` 配置了 alias，这就很有用了。所有 `vue-cli` 创建的项目都默认配置了将 `@` 指向 `/src`。

##### 转换资源 URL 的好处

`file-loader` 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 **你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题**。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。

`url-loader` 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 `file-loader` 处理。

#### Scoped CSS

当 style 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。这类似于 Shadow DOM 中的样式封装。它有一些注意事项，但不需要任何 polyfill。它通过使用 PostCSS 来实现转换

​      使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式 。



#### 深度作用选择器

如果你希望 `scoped` 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 `>>>` 操作符：

```html
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

上述代码将会编译成：

```css
.a[data-v-f3f3eg9] .b { /* ... */ }
```

有些像 Sass 之类的预处理器无法正确解析 `>>>`。这种情况下你可以使用 `/deep/` 或 `::v-deep` 操作符取而代之——两者都是 `>>>` 的别名，同样可以正常工作。

通过 `v-html` 创建的 DOM 内容不受 scoped 样式影响，但是你仍然可以通过深度作用选择器来为他们设置样式。

- **Scoped 样式不能代替 class**。考虑到浏览器渲染各种 CSS 选择器的方式，当 `p { color: red }` 是 scoped 时 (即与特性选择器组合使用时) 会慢很多倍。如果你使用 class 或者 id 取而代之，比如 `.example { color: red }`，性能影响就会消除。你可以在[这块试验田](https://stevesouders.com/efws/css-selectors/csscreate.php)中测试它们的不同。
- **在递归组件中小心使用后代选择器!** 对选择器 `.a .b` 中的 CSS 规则来说，如果匹配 `.a` 的元素包含一个递归子组件，则所有的子组件中的 `.b` 都将被这个规则匹配。

####  热重载

“热重载”不只是当你修改文件的时候简单重新加载页面。启用热重载后，当你修改 `.vue` 文件时，该组件的所有实例将在**不刷新页面**的情况下被替换。它甚至保持了应用程序和被替换组件的当前状态！

##### 状态保留规则

当编辑一个组件的 <template> 时，这个组件实例将就地重新渲染，并保留当前所有的私有状态。能够做到这一点是因
为模板被编译成了新的无副作用的渲染函数。 当编辑一个组件的 <script> 时，这个组件实例将就地销毁并重新创建。(应用中其它组件的状态将会被保留) 是因为 <script> 可能包含带有副作用的生命周期钩子，所以将重新渲染替换为重新加载是必须的，这样做可以确保组件行为的一致性。这也意味着，如果你的组件带有全局副作用，则整个页面将会被重新加载。 <style> 会通过 vue-style-loader 自行热重载，所以它不会影响应用的状态。

```js
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
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
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
```

