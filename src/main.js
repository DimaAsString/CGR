import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/globe.css';
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/Login.vue";

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/home', component: HomeView },
    { path: '/login', component: Login },
  ]
})

Vue.use(ElementUI);
Vue.use(VueRouter)




new Vue({
  router,
  render: h => h(HomeView)
}).$mount('#app')
