
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

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzcyNzE2MTIsImV4cCI6MTYzNzM1ODAxMiwic3ViIjoiOTEzNDRmNTgtOWRlZC00ZTBiLThiZmQtZGM3ZGRmOGY4MGRjIn0.zHI98cjzB--xWRuDmlaiAXxHowmvNGdi-GKzz7z-iXs'

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
