import { login, getInfo } from '@/api/login'
import Ls from '@/utils/ls'

const lsKey = 'vuex_auth'
export const state = {
  currentUser: null,
  roles: null,
  permissions: null,
  info: null
}

export const mutations = {
  SET_CURRENT_USER (state, newValue) {
    state.currentUser = newValue
    Ls.set(lsKey, state)
  },
  SET_PERMISSIONS (state, permissions) {
    state.permissions = permissions
    Ls.set(lsKey, state)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
    Ls.set(lsKey, state)
  },
  SET_INFO: (state, info) => {
    state.info = info
    Ls.set(lsKey, state)
  }
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn: (state) => () => {
    return !!state.currentUser
  },
  roles (state) {
    return state.roles
  },
  currentUser () {
    return state.currentUser
  },
  permissions (state) {
    return state.permissions
  },
  info (state) {
    return state.info
  }
}

export const actions = {
  init ({ state, dispatch, commit }) {
    dispatch('validate')
  },
  // Logs in the current user.
  async logIn ({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn()) return dispatch('validate')
    const params = {

      userName: username,
      password: password
    }
    try {
      const response = await login(params)
      // const permissions = { menus: [], allMenus: [], systemMenus: [], components: [], urls: [] }
      commit('SET_CURRENT_USER', response)

      return new Promise((resolve, reject) => {
        resolve(response)
      })
    } catch (error) {
      console.log(error)
      return new Promise((resolve, reject) => {
        reject(error)
      })
    }
  },
  setPermissions ({ commit }, permissions) {
    commit('SET_PERMISSIONS', permissions)
  },
  GetInfo () {
    return getInfo()
  },
  logoutLocal ({ commit }) {
    commit('SET_CURRENT_USER', null)
    commit('SET_PERMISSIONS', null)
    commit('SET_ROLES', null)
    commit('SET_INFO', null)
  },
  // Logs out the current user.
  logOut ({ commit, dispatch, state }) {
    dispatch('logoutLocal')
    window.localStorage.clear()
    window.location.href = '/'
  },
  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate ({ commit, state, dispatch }) {
    if (!state.currentUser) {
      const data = Ls.get(lsKey)
      if (data) {
        for (const k in data) {
          if (data.hasOwnProperty(k) && data[k]) {
            const key = 'SET_' + k.replace(/[A-Z]/g, letter => '_' + letter.toLowerCase()).toUpperCase()
            commit(key, data[k])
          }
        }
      }
    }
    return Promise.resolve(null)
  }
}
