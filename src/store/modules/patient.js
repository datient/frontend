import axios from 'axios'

const state = {
  dni: null,
  patients: null,
}

const mutations = {
  setPatient(state, patient) {
    state.dni = patient['patient']
  },
  setPatients(state, patients) {
    state.patients = patients
  },
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
  },
  obtainPatients({ commit }, token) {
    console.log(token)
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/patient/',
      headers: { 'Authorization': `JWT ${token}` },
    })
    .then(res => {
      commit('setPatients', res.data)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
