
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

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzczNTAwMzksImV4cCI6MTYzNzQzNjQzOSwic3ViIjoiN2U4Y2YwNTctYmFkNy00OWY0LWFmNWQtNDE2ZWM3MWNjYWVkIn0.f0bhMSbxZOGHlZJ_cu2v5AtAtxA2SLpTzlc5NDqpbz4'

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
