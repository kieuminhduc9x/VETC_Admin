import Vue from 'vue'
import VueRouter from 'vue-router'
// https://github.com/declandewet/vue-meta
import VueMeta from 'vue-meta'
// Adds a loading bar at the top during page loads.
import NProgress from 'nprogress/nprogress'
import '@/styles/nprogress.less' // progress bar custom style

import store from '../store/store'
import { asyncRouterMap } from '@/config/router.config'
import notification from 'ant-design-vue/es/notification'
import { Modal } from 'ant-design-vue'
// import exceptionRouter from './exceptionRouter'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// hack router push callback
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page'
})

const router = new VueRouter({
  routes: asyncRouterMap,
  mode: 'history',
  base: process.env.VUE_APP_PUBLIC_PATH,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  Modal.destroyAll()
  // If this isn't an initial page load...
  if (routeTo.name !== null) {
    // Start the route progress bar.
    NProgress.start()
  }
  if (routeFrom.name !== 'order' && routeFrom.name !== 'order_detail') {
    const order = window.localStorage.getItem('order.fillters')
    if (order) {
      window.localStorage.setItem('order.fillters', null)
    }
  }
  if (routeFrom.name !== 'order_back' && routeFrom.name !== 'order_detail') {
    const order = window.localStorage.getItem('order_back.fillters')
    if (order) {
      window.localStorage.setItem('order.fillters', null)
    }
  }
  if (routeFrom.name !== 'hubstart' && routeFrom.name !== 'order_detail') {
    const order = window.localStorage.getItem('hubstart.fillters')
    if (order) {
      window.localStorage.setItem('hubstart.fillters', null)
    }
  }
  if (routeFrom.name !== 'groupawb' && routeFrom.name !== 'order_detail') {
    const order = window.localStorage.getItem('groupawb.fillters')
    if (order) {
      window.localStorage.setItem('groupawb.fillters', null)
    }
  }
  if (routeFrom.name !== 'bikehubend' && routeFrom.name !== 'order_detail') {
    const order = window.localStorage.getItem('bikehubend.fillters')
    if (order) {
      window.localStorage.setItem('bikehubend.fillters', null)
    }
  }
  function redirectToLogin () {
    return next({ name: 'login', query: { redirectFrom: routeTo.fullPath } })
  }
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)
  // If auth is required and the user is logged in...
  if (routeTo.name === 'tracking') {
    return next()
  }
  if (store.getters['auth/loggedIn']() && routeTo.name !== 'login') {
    if (routeTo.name === 'login') {
      return next({ name: 'dashboard' })
    } else {
      // if (store.state.auth.permissions !== null && [...store.state.auth.permissions.urls].concat(exceptionRouter).indexOf(routeTo.name) !== -1) {
      //   return next()
      // } else {
      //   store.dispatch('auth/logOut')
      //   return redirectToLogin()
      // }
      // return next()
      const routerName = routeTo.name !== '' ? routeTo.name.toUpperCase() : ''
      if (routeTo.name === 'dashboard' ||
          routeTo.name === 'home' ||
          routeTo.name === 'profile' ||
          hasPrivilege(routerName) ||
          routeTo.name === 'config' ||
          routeTo.name === 'config.account' ||
          routeTo.name === 'config.account.create' ||
          routeTo.name === 'config.account.update' ||
          routeTo.name === 'warehouse_management' ||
          routeTo.name === 'import_export_management.detail' ||
          routeTo.name === 'import_export_management' ||
          routeTo.name === 'barcode_readers_management' ||
          routeTo.name === 'order_management.detail' ||
          routeTo.name === 'order_management') {
        return next()
      } else {
        notification.error({
          title: 'Lỗi',
          message: 'Bạn không có quyền truy cập ' + routeTo.meta.head.title + '!'
        })
        next({ name: 'dashboard' })
      }
    }
  } else {
    if (authRequired && routeFrom.name !== 'login') {
      return redirectToLogin()
    } else {
      return next()
    }
  }
  function hasPrivilege (privilege) {
    const privileges = store.getters['auth/currentUser']['listPrivilege']
    return privileges && privileges.includes(privilege)
  }
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // Create a `beforeResolve` hook, which fires whenever
  // `beforeRouteEnter` and `beforeRouteUpdate` would. This
  // allows us to ensure data is fetched even when params change,
  // but the resolved route does not. We put it in `meta` to
  // indicate that it's a hook we created, rather than part of
  // Vue Router (yet?).
  try {
    // For each matched route...
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // If a `beforeResolve` hook is defined, call it with
        // the same arguments as the `beforeEnter` hook.
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // If the user chose to redirect...
            if (args.length) {
              // If redirecting to the same route we're coming from...
              if (routeFrom.name === args[0].name) {
                // Complete the animation of the route progress bar.

              }
              // Complete the redirect.
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          // Otherwise, continue resolving the route.
          resolve()
        }
      })
    }
    // If a `beforeResolve` hook chose to redirect, just return.
  } catch (error) {
    return
  }

  // If we reach this point, continue resolving the route.
  next()
})

// When each route is finished evaluating...
router.afterEach((routeTo, routeFrom) => {
  // Complete the animation of the route progress bar.
  if (routeTo.meta.head !== undefined) {
    if (routeTo.meta.head.title !== undefined) {
      document.title = routeTo.meta.head.title + ' - Quản lý kho Nam Cường'
    }
    if (routeTo.meta.head.description !== undefined) {
      const meta = document.getElementsByTagName('meta').namedItem('description')
      if (meta !== null) {
        meta.setAttribute('content', routeTo.meta.head.description)
      } else {
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        meta.setAttribute('content', routeTo.meta.head.description)
        document.getElementsByTagName('head')[0].appendChild(meta)
      }
    }
  }
  NProgress.done()
})

export default router
