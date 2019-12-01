import axios from '../../plugins/axios.js'

const state = {
  bed: null,
  doctor: null,
  entry_at: null,
  done_at: null,
  boarding_days: null,
  error: null,
}

const mutations = {
  setBed(state, bed) { 
    state.bed = bed
  },
  setDoctor(state, doctor) {
    state.doctor = doctor
  },
  setError(state, error) {
    state.error = error
  },
  setHospitalization(state, info) {
    info.entry_at !== null ? state.entry_at = new Date(info.entry_at).toLocaleString() : state.entry_at = '-'      
    state.done_at = info.done_at
    info.boarding_days !== null ? state.boarding_days = info.boarding_days : state.boarding_days = 0
  },
}

const actions = {
  createHospitalization({ commit }, { token, bedId, doctorId, patientDni }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/api/hospitalization/`,
        headers: { 'Authorization': `JWT ${token}` },
        data: {
          bed: bedId,
          doctor: doctorId,
          patient: patientDni,
        },
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.response.data)
      })
    })
  },
  obtainHospitalizationPatient({ commit }, { token, dni }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `/api/hospitalization/${dni}/patient_filter/`,
        headers: { 'Authorization': `JWT ${token}` },
      })
      .then(res => {
        let bedId = res.data.bed
        commit('setHospitalization', res.data) 
        axios({
          method: 'get',
          url: `/api/bed/${bedId}/`,
          headers: { 'Authorization': `JWT ${token}` },
        })
        .then(res => {
          commit('setBed', res.data)
          commit('setError', null)
        })
        resolve(res.data)
      })
      .catch(err => {
        commit('setHospitalization', { entry_at: null, done_at: null, boarding_days: null }) 
        commit('setError', err.response.data.detail)
        commit('setBed', null)
      })
    })
  },
  obtainHospitalization({ commit, dispatch }, { token, bedId }) {
    axios({
      method: 'get',
      url: `/api/hospitalization/${bedId}/bed_filter/`,
      headers: { 'Authorization': `JWT ${token}` },
    })
    .then(res => {
      let doctorId = res.data.doctor
      let dni = res.data.patient
      let entry_at = res.data.entry_at
      let done_at = res.data.done_at
      let boarding_days = res.data.boarding_days
      commit('setHospitalization', { entry_at, done_at, boarding_days, entry_at })
      dispatch('patient/obtainPatient', { token, dni }, { root: true })
      axios({
        method: 'get',
        url: `/api/doctor/${doctorId}/`,
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
          progress: []
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
