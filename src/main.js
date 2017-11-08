// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import swal from 'sweetalert2'
import VueFire from 'vuefire'
import Vuetify from 'vuetify'
import('vuetify/dist/vuetify.min.css')
import('sweetalert2/dist/sweetalert2.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueFire)

Vue.prototype.$swal = swal

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
