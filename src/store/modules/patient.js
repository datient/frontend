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
  createPatient({ commit }, { token, patient }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/patient/',
        headers: { 'Authorization': `JWT ${token}` },
        data: {
          dni: patient.dni,
          first_name: patient.first_name,
          last_name: patient.last_name,
          birth_date: patient.birth_date,
          history_number: patient.history_number,
          gender: 0,
          income_diagnosis: patient.income_diagnosis
        },
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response.data)
      })
    })
  },
  deletePatient({ commit }, { token, dni }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/api/patient/${dni}/`,
        headers: { 'Authorization': `JWT ${token}` },
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
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
