// 寄生组合式继承的核心方法 
// GithubUser.call(this, username, password) // 继承属性
// 实现原型上的方法
function inherit(child, parent) {
    // 继承父类的原型
    child.prototype = Object.create(parent.prototype)
    // 重写被污染的子类的constructor
    child.prototype.constructor = child
}

//instanceof      a instanceof A
function instanceOf(left,right) {
    let proto = left.__proto__;
    let prototype = right.prototype
    while(true) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__;
    }
}
