import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/globe.css';

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import WorkerInfo from "@/views/WorkerInfo.vue";
import UserInfo from "@/views/UserInfo.vue";
import ShowInfo from "@/views/ShowInfo.vue";

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/workerinfo', component: WorkerInfo },
    { path: '/userinfo', component: UserInfo },
    { path: '/showinfo', component: ShowInfo },
  ]
})

Vue.use(ElementUI);
Vue.use(VueRouter)


new Vue({
  router,
  render: h => h(ShowInfo)
}).$mount('#app')
