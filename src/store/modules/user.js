const state = {
  token: null
}

const mutations = {
  setToken(state, token) {
    state.token = token
  }
}

const actions = {
  obtainToken() {
    console.log('hola')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
