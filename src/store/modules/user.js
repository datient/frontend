import axios from 'axios'

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
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/token/',
      headers: { 'Content-Type': 'application/json' },
      data: {
        'email': email,
        'password': password
      }
    })
      .then(res => {
        commit('setToken', res.data.token)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
