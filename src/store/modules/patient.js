import axios from 'axios'

const state = {
  dni: null
}

const mutations = {
  setPatient(state, patient) {
    state.dni = patient['patient']
  }
}

const actions = {
  obtainPatient({ commit }, token) {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/hospitalization/',
      headers: { 'Authorization': `JWT ${token}` },
    })
    .then(res => {
      commit('setPatient', res.data[0]) 
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
