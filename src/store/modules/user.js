const state = {
  token: null
}

const mutations = {
  setToken(state, token) {
    state.token = token
  }
}

const actions = {
  obtainToken({ commit }, { email, password }) {
    console.log(email, password)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
