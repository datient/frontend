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
  setNull(state) {
    state.token = null
    state.id = null
    state.email = null
    state.first_name = null
    state.last_name = null
    state.hierarchy = null
  },
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
  createUser({ }, user) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/register/',
        headers: { 'Content-Type': 'application/json' },
        data: {
          'email': user['email'],
          'first_name': user['first_name'],
          'last_name': user['last_name'],
          'hierarchy': user['hierarchy'],
          'password': user['password'],
          'password_confirm': user['password_confirm']
        }
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.response.data)
      })
    })
  },
  logOut({ commit }) {
    commit('setNull')
  },
  obtainToken({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
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
        resolve()
      })
      .catch((err) => {
        reject(err.response.data)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
