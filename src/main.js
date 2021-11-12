
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

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzY2NzE2NjIsImV4cCI6MTYzNjc1ODA2Miwic3ViIjoiZDY1ZjkwMjYtYzY2NC00YTJiLTg1NDUtMTUwMjFiMjY3NTE1In0.pFmTHcxakcF97CIizMq-DQOloor0_X3-IrydQpe37lE'

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
