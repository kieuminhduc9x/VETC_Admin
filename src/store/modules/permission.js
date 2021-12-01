import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import Ls from '@/utils/ls'

/**
 * Filter the account to have a permission and remove the menu from the load list
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * Use this method to filter menus where the role does not exist when you have multiple accounts for multiple accounts.
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, roles) {
  return routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
}

function checkMenuPermission (menus, path) {
  const matchedPaths = menus.filter(function (menuItem) {
    return menuItem.objectUrl === path
  })
  return matchedPaths.length > 0
}
function checkComponentPermission (components, code) {
  const matchedComponents = components.filter(function (componentItem) {
    return componentItem.objectCode === code
  })
  return matchedComponents.length > 0
}
const lsKey = 'vuex_permission'
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    permissions: { menus: [], components: [], urls: [] }
  },
  getters: {
    addRouters (state) {
      return state.addRouters
    },
    getPermissions (state) {
      return state.permissions
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      Ls.set(lsKey, state)
    },
    SET_PERMISSIONS (state, permissions) {
      state.permissions = permissions
      Ls.set(lsKey, state)
    },
    SET_ADD_ROUTERS (state, routers) {
      state.addRouters = routers
      Ls.set(lsKey, state)
    }
  },
  actions: {
    init ({ state, dispatch, commit }) {
    },
    generateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    hasMenuPermission ({ state, dispatch }, path) {
      const menus = state.permissions.menus.filter(function (menuItem) {
        if (!(menuItem.objectUrl === path)) {
          return checkMenuPermission(menuItem.childObjects, path)
        }
        return true
      })
      return menus.length > 0
    },
    hasUrlPermission ({ state }, url) {
      return state.permissions.urls.indexOf(url) !== -1
    },
    hasComponentPermission ({ state }, code) {
      const menus = state.permissions.menus.filter(function (componentItem) {
        if (!(componentItem.objectCode === code)) {
          return checkComponentPermission(componentItem.childObjects, code)
        }
        return true
      })
      return menus.length > 0
    }
  }
}

export default permission
