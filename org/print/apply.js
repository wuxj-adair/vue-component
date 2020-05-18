//apply
Function.prototype.myApply = function(context=window, args=[]) {
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol()
    context[key] = this
    //通过隐式绑定的方式调用函数
    const result = context[key](...args)
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}

//bind
//就是返回一个函数,里面执行了apply上述的操作而已.
//不过有一个需要判断的点, 因为返回新的函数, 要考虑到使用new去调用, 并且new的优先级比较高, 所以需要判断new的调用, 
//还有一个特点就是bind调用的时候可以传参, 调用之后生成的新的函数也可以传参,
Function.prototype.myBind = function (context, ...args) {
    const fn = this
    args = args ? args : []
    return function newFn(...newFnArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newFnArgs)
        }
        return fn.apply(context, [...args,...newFnArgs])
    }
}
