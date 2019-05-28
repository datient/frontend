import axios from 'axios'

const state = {
  token: null,
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  hierarchy: null,
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.id = user.id
    state.email = user.email
    state.first_name = user.first_name
    state.last_name = user.last_name
    state.hierarchy = user.hierarchy
  },
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
      commit('setUser', res.data.user)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
