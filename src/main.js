import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {Message} from 'element-ui'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

//该文件是脚手架项目中的main.js
 
Vue.prototype.$axios = axios //在Vue的原型上添加一个$http属性，该属性保存了axios

axios.defaults.baseURL = 'http://127.0.0.1:8000/'
// 'http://127.0.0.1:8000/'
// 'http://123.249.3.67:8001/'

Vue.use(ElementUI)
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')





