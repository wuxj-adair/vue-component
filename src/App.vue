<!--
 * @Author: your name
 * @Date: 2020-01-13 14:32:57
 * @LastEditTime: 2020-04-01 14:44:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\App.vue
 -->
<template>
    <div id="app">
        <div id="nav">
            <ul>
                <li>
                    <router-link to="/form">实战 1：具有数据校验功能的表单组件 —— Form</router-link>
                </li>
                <li>
                    <router-link to="/checkbox">实战 2：组合多选框组件 —— CheckboxGroup & Checkbox</router-link>
                </li>
                <li>
                    <router-link to="/display">实战 3：动态渲染 .vue 文件的组件 —— Display</router-link>
                </li>
                <li>
                    <router-link to="/alert">实战 4：全局通知组件 —— $Alert</router-link>
                </li>
                <li>
                    <router-link to="/table-render">实战 5：可用 Render 自定义列的表格组件 —— Table</router-link>
                </li>
                <li>
                    <router-link to="/table-slot">实战 6：可用 slot-scope 自定义列的表格组件 —— Table</router-link>
                </li>
                <li>
                    <router-link to="/tree">实战 7：树形控件 —— Tree</router-link>
                </li>
                <li>
                    <router-link to="/like-heart">like-heart</router-link>
                </li>
            </ul>
        </div>
        <hr>
        <router-view/>
    </div>
</template>
<script>
    export default {

    }
</script>
