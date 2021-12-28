import store from './../store/store'

const Auth = {}
Auth.install = function (Vue, options) {
  let user = null
  let token = null
  const currentUser = store.getters['auth/currentUser']
  if (currentUser && currentUser['userTokenSdo'] !== undefined && currentUser['userTokenSdo']['customUserDetails'] !== undefined) {
    user = currentUser['userTokenSdo']['customUserDetails']
  } else {
    user = currentUser
  }
  if (currentUser && currentUser['token']) {
    token = currentUser['token']
  }
  const auth = {
    token: token,
    user: user,
    isLoggedIn: store.getters['auth/loggedIn'](),
    roles: store.getters['auth/roles'],
    permissions: store.getters['auth/permissions']
  }
  auth.login = function (ticket, username, password) {
    const params = { ticket, username, password }
    return store.dispatch('auth/logIn', params)
  }
  auth.logOut = function () {
    return store.dispatch('auth/logOut')
  }
  auth.hasPrivilege = function (privilege) {
    const privileges = store.getters['auth/currentUser']['listPrivilege']
    return privileges && privileges.includes(privilege)
  }
  auth.hasAnyPrivilege = function (privilege) {
    const privileges = store.getters['auth/currentUser']['listPrivilege']
    return privileges.some((item, index) => {
      return privilege.includes(item)
    })
  }
  Vue.prototype.$auth = auth
}
export {
  Auth
}
