
import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMask from 'v-mask';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import router from './config/router'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMask);

// TEMPORARIO!

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzcxMDI5MjAsImV4cCI6MTYzNzE4OTMyMCwic3ViIjoiZjY1MWEwOWQtYzNkMi00NzgwLWFmYTgtN2I5MzRmNDY1YmMwIn0.uA2jroAWtH-VKcoSA8Xr4U0E29RJMrhIZKLret9dksQ'

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
