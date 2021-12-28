import Vue from 'vue'
import store from '@/store/store'

const privilege = Vue.directive('privilege', {
  inserted: function (el, binding, vnode) {
    const privilege = binding.arg || binding.value
    const privileges = store.getters.privilege
    if (privileges && !privileges.includes(privilege)) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})

export default privilege
