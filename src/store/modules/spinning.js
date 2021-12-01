const state = {
  spinning: false
}

const getters = {
  SPINNING: st => {
    return st.spinning
  }
}

const mutations = {
  SPINNING (st, data) {
    localStorage.setItem('spinning', data)
    st.spinning = data
  }
}

const actions = {
  setSpinning ({ commit }, data) {
    commit('SPINNING', data)
  }
}

export default { state, getters, mutations, actions }
