
import Vue from 'vue'
import App from './App.vue'
import store from './config/store'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import router from './config/router'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// TEMPORARIO!

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzY1ODEyNzMsImV4cCI6MTYzNjY2NzY3Mywic3ViIjoiZDBhODA3MWItNGFiMy00ZDg2LWJhZmQtZDU2YmM0ZjY2ZjA0In0.JQNKLvSBmqVBNDlS_a8WwRLk2PgL4hb6OFTcxdDxtFI'

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
