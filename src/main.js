import '@babel/polyfill'
import Vue from 'vue'
import Antd, { FormModel } from 'ant-design-vue'
import router from './router'
import i18n from './i18n'
import store from './store/store'
import App from './App'
import { VueAxios } from './utils/request'
import { Auth } from './utils/auth'
// import Storage from 'vue-ls'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import VueCurrencyInput from 'vue-currency-input'
import browserDetect from 'vue-browser-detect-plugin'
import './directives/action'
import './directives/permission'
Vue.use(browserDetect)

const pluginOptions = {
  globalOptions: { currency: 'VND' }
}
Vue.use(VueCurrencyInput, pluginOptions)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
require('./utils/mixins')
require('./utils/filters')
Vue.config.productionTip = false
/*
const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
}
// Vue.use(PageLoading)

Vue.use(Storage, options)
*/
Vue.use(Antd)
Vue.use(FormModel)
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(Auth)
new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
