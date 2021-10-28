
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

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzUzNzY0MTUsImV4cCI6MTYzNTQ2MjgxNSwic3ViIjoiYjE1NWJiYzktMzc5Yi00YjQxLTg4NDMtMzMwNWU3YzI2M2I0In0.WfMN1-dEf2I7SeGm0pp_EBERSLNevqPWhEg_GMHe7BY'

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
