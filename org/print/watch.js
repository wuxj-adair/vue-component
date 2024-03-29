//在观察者模式中，观察者需要直接订阅目标事件；在目标发出内容改变的事件后，直接接收事件并作出响应
var shoeObj = {}; // 定义发布者
shoeObj.list = []; // 缓存列表 存放订阅者回调函数

// 增加订阅者
shoeObj.listen = function (key, fn) {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    if (!this.list[key]) {
        this.list[key] = [];
    }
    // 订阅消息添加到缓存列表
    this.list[key].push(fn);
}

// 发布消息
shoeObj.trigger = function () {
    // 取出消息类型名称
    var key = Array.prototype.shift.call(arguments);
    // 取出该消息对应的回调函数的集合
    var fns = this.list[key];

    // 如果没有订阅过该消息的话，则返回
    if (!fns || fns.length === 0) {
        return;
    }
    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments); // arguments 是发布消息时附送的参数
    }
};

// 小红订阅如下消息
shoeObj.listen('red', function (size) {
    console.log("尺码是：" + size);
});

// 小花订阅如下消息
shoeObj.listen('block', function (size) {
    console.log("再次打印尺码是：" + size);
});
shoeObj.trigger("red", 40);
shoeObj.trigger("block", 42);
