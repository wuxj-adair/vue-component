/*
 * @Author: your name
 * @Date: 2020-01-13 14:32:57
 * @LastEditTime: 2020-04-01 16:58:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-book-master\src\router.js
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/form',
            component: () => import('./views/form.vue')
        },
        {
            path: '/checkbox',
            component: () => import('./views/checkbox.vue')
        },
        {
            path: '/display',
            component: () => import('./views/display.vue')
        },
        {
            path: '/alert',
            component: () => import('./views/alert.vue')
        },
        {
            path: '/table-render',
            component: () => import('./views/table-render.vue')
        },
        {
            path: '/table-slot',
            component: () => import('./views/table-slot.vue')
        },
        {
            path: '/tree',
            component: () => import('./views/tree.vue')
        },
        {
            path: '/input-number',
            component: () => import('./views/input-number.vue')
        },
        {
            path: '/',
            component: () => import('./views/index.vue')
        }
        ,
        {
            path: '/like-heart',
            component: () => import('./views/like-heart/like-heart.vue')
        }
    ]
})
