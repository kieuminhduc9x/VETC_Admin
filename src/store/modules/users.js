export const state = {
  cached: []
}

export const getters = {}

export const mutations = {
  CACHE_USER (state, newUser) {
    state.cached.push(newUser)
  }
}

export const actions = {
}
