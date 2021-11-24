
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

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mzc3MDYzNTMsImV4cCI6MTYzNzc5Mjc1Mywic3ViIjoiN2U4Y2YwNTctYmFkNy00OWY0LWFmNWQtNDE2ZWM3MWNjYWVkIn0.h4Z1a3EWJgrl8yMKvDyqQRAwj21iJ-bcRdhV_6lmEuI'

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
