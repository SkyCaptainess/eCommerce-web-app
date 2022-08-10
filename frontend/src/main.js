import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store/store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

createApp(App).use(store).use(router).use( ElementPlus ).mount('#app')

const storageHandler = function (e) {
    store.commit("user/SET_PATH",localStorage.getItem("path"))
  }
window.addEventListener('storage', storageHandler, false)