import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', name: 'Login', component: () => import('../views/Login.vue')},
        {path: '/ShowInfo', name: 'ShowInfo', component: () => import('../views/ShowInfo.vue')},
        {path: '/UserInfo', name: 'UserInfo', component: () => import('../views/UserInfo.vue')},
    ]
})

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router
