import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueScrollTo)

require('normalize.css')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
