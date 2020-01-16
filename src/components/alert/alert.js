/*
 * @Author: your name
 * @Date: 2020-01-13 14:32:57
 * @LastEditTime : 2020-01-14 11:48:08
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\components\alert\alert.js
 */
//最后把 alert.js 作为插件注册到 Vue 里就行，在入口文件 src/main.js中，通过 prototype 给 Vue 添加一个实例方法
import Notification from './notification.js';

let messageInstance;
//调用 notification.js 创建实例，并通过 add 把数据传递过去，这是组件开发的最后一步，也是最终的入口。
function getMessageInstance () {
    messageInstance = messageInstance || Notification.newInstance();
    return messageInstance;
}

function notice({ duration = 1.5, content = '' }) {
    let instance = getMessageInstance();

    instance.add({
        content: content,
        duration: duration
    });
}

export default {
    info (options) {
        return notice(options);
    }
}