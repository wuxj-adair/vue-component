

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

