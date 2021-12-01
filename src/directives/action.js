import Vue from 'vue'
import store from '@/store/store'

const action = Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    const actionName = binding.arg || binding.value
    const permissions = store.getters.permissions
    const uri = vnode.context.$route.name
    const action = uri + '_' + actionName
    if (permissions && !permissions.includes(action)) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})

export default action
