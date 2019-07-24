import axios from 'axios'

const state = {
  dni: null,
  age: null,
  first_name: null,
  last_name: null,
  birth_date: null,
  gender: null,
  history_number: null,
  income_diagnosis: null,
  patients: null,
}

const mutations = {
  setPatient(state, patient) {
    state.dni = patient['dni']
    state.age = patient['age']
    state.first_name = patient['first_name']
    state.last_name = patient['last_name']
    state.birth_date = patient['birth_date']
    if (patient.gender === 0) {
      state.gender = 'Masculino'
    } else if (patient.gender === 1) {
      state.gender = 'Femenino'
    } else {
      state.gender = null
    }
    state.history_number = patient['history_number']
    state.income_diagnosis = patient['income_diagnosis']
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
          gender: patient.gender === 'Masculino' ? 0 : 1,
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
  editPatient({ commit }, { token, patient }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/api/patient/${patient.dni}/` ,
        headers: { 'Authorization': `JWT ${token}` },
        data: {
          dni: patient.dni,
          first_name: patient.first_name,
          last_name: patient.last_name,
          birth_date: patient.birth_date,
          history_number: patient.history_number,
          gender: patient.gender === 'Masculino' ? 0 : 1,
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
  editPatient({ commit }, { token, patient }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/api/patient/${patient.dni}/` ,
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
  obtainPatient({ commit }, { token, dni }) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/patient/${dni}/`,
        headers: { 'Authorization': `JWT ${token}` },
      })
      .then(res => {
        console.log(res.data)
        commit('setPatient', res.data) 
      })
    .catch(() => {
      commit('setPatient', {
        dni: null,
        age: null,
        first_name: null,
        last_name: null,
        birth_date: null,
        gender: null,
        history_number: null,
        income_diagnosis: null,
      })
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
