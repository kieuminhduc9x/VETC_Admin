import Vue from 'vue'
import store from '@/store/store'

const permission = Vue.directive('permission', {
  inserted: function (el, binding, vnode) {
    const permission = binding.arg || binding.value
    const permissions = store.getters.permissions
    if (permissions && !permissions.includes(permission)) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})

export default permission
