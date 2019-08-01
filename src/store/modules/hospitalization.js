import axios from 'axios'
import { userInfo } from 'os';

const state = {
  doctor: null,
  error: null,
}

const mutations = {
  setDoctor(state, doctor) {
    state.doctor = doctor
  },
  setError(state, error) {
    state.error = error
  },
}

const actions = {
  obtainHospitalization({ commit, dispatch }, { token, bedId }) {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/hospitalization/${bedId}/bed_filter/`,
      headers: { 'Authorization': `JWT ${token}` },
    })
    .then(res => {
      let doctorId = res.data.doctor
      let dni = res.data.patient
      dispatch('patient/obtainPatient', { token, dni }, { root: true })
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/doctor/${doctorId}/`,
        headers: { 'Authorization': `JWT ${token}` },
      })
      .then(res => {
        commit('setDoctor', res.data)
        commit('setError', null)
      })
    })
    .catch(err => {
      commit('setDoctor', null)
      let detailError = err.response.data.detail
      commit('setError', detailError)
      commit(
        'patient/setPatient',
        {
          dni: null,
          age: null,
          first_name: null,
          last_name: null,
          birth_date: null,
          gender: null,
          history_number: null,
          income_diagnosis: null,
        },
        { root: true },
      )
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
