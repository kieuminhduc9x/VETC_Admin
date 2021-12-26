import { listProvince } from '@/api/common'
export const state = {
  provinces: null,
  select_store: false,
  store_id: null
}

export const getters = {
  provinces (state) {
    return state.provinces
  },
  select_store (state) {
    return state.select_store
  }
}

export const mutations = {
  SET_PROVINCES: (state, provinces) => {
    state.provinces = provinces
  },
  SET_SELECT_STORE: (state, selectStore) => {
    state.select_store = selectStore
  },
  SET_STORE: (state, store) => {
    state.store_id = store
  }
}

export const actions = {
  fetchProvince ({ commit, state, rootState }, payload) {
    // 1. check if province exist.
    const { provinces } = state
    if (provinces && provinces.length > 0) {
      return Promise.resolve(provinces)
    }

    return listProvince(payload).then((response) => {
      const provinceData = response.data
      commit('SET_PROVINCES', provinceData)
      return provinceData
    })
  },
  updateSelectStore ({ commit, state, rootState }, payload) {
    commit('SET_SELECT_STORE', payload)
  },
  updateStore ({ commit, state, rootState }, payload) {
    commit('SET_STORE', payload)
  }
}
