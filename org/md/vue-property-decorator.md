[vue-property-decorator]: https://www.jianshu.com/p/d8ed3aa76e9b

这个组件完全依赖于`vue-class-component`.它具备以下几个属性:

- @Component (完全继承于`vue-class-component`)
- @Emit
- @Inject
- @Provice
- @Prop
- @Watch
- @Model
- Mixins  (在`vue-class-component`中定义);

```js
//对于vue中data里的变量,我们可以直接按ts定义类变量的写法写就可以
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    @Component({})
    export default class "组件名" extends Vue{
        ValA: string = "hello world";
        ValB: number = 1;
    }
</script>

//等同于
<script>
    import Vue from 'vue';
    export default {
        data(){
            return {
                ValA: 'hello world',
                ValB: 1
            }
        }
    }
</script>
```

```js
//原本Vue中的computed里的每个计算属性都变成了在前缀添加get的函数
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    @Component({})
    export default class "组件名" extends Vue{
        get ValA(){
            return 1;
        }
    }
</script>
//等同于
<script>
    import Vue from 'vue';
    export default {
        computed: {
            ValA: function() {
                return 1;
            }
        }
    }
</script>
```

```typescript
//在@Emit装饰器的函数会在运行之后触发等同于其函数名(驼峰式会转为横杠式写法)的事件, 并将其函数传递给$emit.
//在Vue中我们是使用$emit触发事件,
//使用vue-property-decorator时,可以借助@Emit装饰器来实现.
//@Emit修饰的函数所接受的参数会在运行之后触发事件的时候传递过去.
//@Emit触发事件有两种写法
//@Emit()不传参数,那么它触发的事件名就是它所修饰的函数名.
//@Emit(name: string),里面传递一个字符串,该字符串为要触发的事件名.
<script lang="ts">
    import {Vue, Component, Emit} from 'vue-property-decorator';
    @Component({})
    export default class "组件名" extends Vue{
        mounted(){
            this.$on('emit-todo', function(n) {
                console.log(n)
            })
            this.emitTodo('world');
        }

        @Emit()
        emitTodo(n: string){
            console.log('hello');
        }
    }
</script>
//等同于
<script>
    import Vue from 'vue';
    export default {
        mounted(){
            this.$on('emit-todo', function(n) {
                console.log(n)
            })
            this.emitTodo('world');
        },
        methods: {
            emitTodo(n){
                console.log('hello');
                this.$emit('emit-todo', n);
            }
        }
    }
</script>
```

```js
//触发特定的事件,比如在emitTodo下触发reset事件:
//我们只需要给装饰器@Emit传递一个事件名参数reset,这样函数emitTodo运行之后就会触发reset事件.
<script lang="ts">
    import {Vue, Component, Emit} from 'vue-property-decorator';
    @Component({})
    export default class "组件名" extends Vue{
        @Emit('reset')
        emitTodo(n: string){
        }
    }
</script>
```

```js
//用@Watch装饰器来替换Vue中的watch属性,以此来监听值的变化.
//@Watch,接受第一个参数为要监听的属性名 第二个属性为可选对象.
//@Watch所装饰的函数即监听到属性变化之后的操作.
import {Vue, Component, Watch} from 'vue-property-decorator';
@Watch('child')
onChangeValue(newVal: string, oldVal: string){
    // todo...
}
@Watch('person', {immediate: true, deep: true})
onChangeValue(newVal: Person, oldVal: Person){
    // todo...
}
//等同于
export default{
    watch: {
        'child': this.onChangeValue ,// 这种写法默认 `immediate`和`deep`为`false`
        'person': {
            handler: 'onChangeValue',
            immediate: true,
            deep: true
        }
    },
    methods: {
        onChangeValue(newVal, oldVal){
            // todo...
        }
    }
}
```

```js
//@Prop
//vue中子组件接收父组件传递来的参数.定义Prop属性.
//比如子组件从父组件接收三个属性propA,propB,propC.
//propA类型为Number
//propB默认值为default value
//propC类型为String或者Boolean
//@Prop接受一个参数可以是类型变量或者对象或者数组.
//@Prop接受的类型比如Number是JavaScript的类型,之后定义的属性类型则是TypeScript的类型.
export default {
  props: {
    propA: {
      type: Number
    },
    propB: {
      default: 'default value'
    },
    propC: {
      type: [String, Boolean]
    },
  }
}
//等同于
<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    @Component({})
    export default class "组件名" extends Vue{
        @Prop(Number) propA!: number; //这里 !和可选参数?是相反的, !告诉TypeScript我这里一定有值.
        @Prop({default: 'default value'}) propB!: string;
        @propC([String, Boolean]) propC: string | boolean;
    }
</script>
```

Mixins 混合,结合TypeScript之后我们有两种mixins的方法.

```jsx
//一种是vue-class-component提供的.
//定义要混合的类 mixins.ts
import Vue from 'vue';
import  Component  from 'vue-class-component';
@Component  // 一定要用Component修饰
export default class myMixins extends Vue {
    value: string = "Hello"
}
```

```jsx
// 引入
import  Component  {mixins}  from 'vue-class-component';
import myMixins from 'mixins.ts';
@Component
export class myComponent extends mixins(myMixins) {
     // 直接extends myMinxins 也可以正常运行
      created(){
          console.log(this.value) // => Hello
    }
}
```

```tsx
//第二种方式是在@Component中混入.
//我们改造一下mixins.ts,定义vue/type/vue模块,实现Vue接口
// mixins.ts
import { Vue, Component } from 'vue-property-decorator';
//declare  module
//TypeScript 本身不支持导入非 JavaScript 内容，但是为了支持其他工具接下来的工作，所以做了这么个语法支持。
declare module 'vue/types/vue' {
    interface Vue {
        value: string;
    }
}
@Component
export default class myMixins extends Vue {
    value: string = 'Hello'
}
```

```jsx
import { Vue, Component, Prop } from 'vue-property-decorator';
import myMixins from '@static/js/mixins';
@Component({
    mixins: [myMixins]
})
export default class myComponent extends Vue{
    created(){
        console.log(this.value) // => Hello
    }
}
```

- 总结: 两种方式不同的是在定义`mixins`时如果没有定义`vue/type/vue`模块, 那么在混入的时候就要`继承`该`mixins`; 如果定义`vue/type/vue`模块,在混入时可以在`@Component`中`mixins`直接混入.

#### @Model

`Vue`组件提供`model`: `{prop?: string, event?: string}`让我们可以定制`prop`和`event`.
 默认情况下，一个组件上的`v-model` 会把 `value`用作 `prop`且把 `input`用作 `event`，但是一些输入类型比如单选框和复选框按钮可能想使用 `value prop`来达到不同的目的。使用`model`选项可以回避这些情况产生的冲突。

```js
Vue.component('my-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `checked` as the prop which take the place of `value`
    checked: {
      type: Number,
      default: 0
    }
  },
  // ...
})
```

```xml
<my-checkbox v-model="foo" value="some value"></my-checkbox>
```

上述代码相当于：

```csharp
<my-checkbox
  :checked="foo"
  @change="val => { foo = val }"
  value="some value">
</my-checkbox>
```

即`foo`双向绑定的是组件的`checke`, 触发双向绑定数值的事件是`change`
使用`vue-property-decorator`提供的`@Model`改造上面的例子.

```tsx
import { Vue, Component, Model} from 'vue-property-decorator';
@Component
export class myCheck extends Vue{
   @Model ('change', {type: Boolean})  checked!: boolean;
}
```

总结, `@Model()`接收两个参数, 第一个是`event`值, 第二个是`prop`的类型说明, 与`@Prop`类似, 这里的类型要用`JS`的. 后面在接着是`prop`和在`TS`下的类型说明.