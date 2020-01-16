/*
 * @Author: your name
 * @Date: 2020-01-13 14:32:57
 * @LastEditTime: 2020-01-14 11:44:37
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\components\alert\notification.js
 */
import Alert from './alert.vue';
import Vue from 'vue';
// Alert 组件没有任何 props，这里在 Render Alert 组件时，还是给它加了 props，
// 当然，这里的 props 是空对象 {}，而且即使传了内容，也不起作用。
// 这样做的目的还是为了扩展性，如果要在 Alert 上添加 props 来支持更多特性，是要在这里传入的。
// 不过话说回来，因为能拿到 Alert 实例，用 data 或 props 都是可以的。
Alert.newInstance = properties => {
    const props = properties || {};

    const Instance = new Vue({
        data: props,
        render (h) {
            return h(Alert, {
                props: props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);

    const alert = Instance.$children[0];

    return {
        add (noticeProps) {
            alert.add(noticeProps);
        },
        remove (name) {
            alert.remove(name);
        }
    }
};

export default Alert;