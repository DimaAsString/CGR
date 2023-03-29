import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/globe.css';
import Login from "@/views/Login.vue";
import WorkerInfo from "@/views/WorkerInfo.vue";
import UserInfo from "@/views/UserInfo.vue";
import ShowInfo from "@/views/ShowInfo.vue";

import router from './router'


Vue.config.productionTip = false

// const router = new VueRouter({
//     routes: [
//         {path: '/Login', name: 'Login', component: Login},
//         {path: '/ShowInfo', name: 'ShowInfo', component: ShowInfo},
//         {path: '/UserInfo', name: 'UserInfo', component: UserInfo},
//         {path: '/WorkerInfo', name: 'WorkerInfo', component: WorkerInfo},
//     ]
// })

Vue.use(ElementUI);
// Vue.use(VueRouter)


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
