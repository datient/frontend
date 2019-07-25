import axios from 'axios'
import { userInfo } from 'os';

const state = {
  doctor: null,
}

const mutations = {
  setDoctor(state, doctor) {
    console.log(doctor)
    state.doctor = doctor
  }
}

const actions = {
  obtainHospitalization({ commit, dispatch }, { token, bedId }) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/bed/${bedId}/`,
        headers: { 'Authorization': `JWT ${token}` },
      })
      .then(res => {
        let index = res.data.hospitalizations.length - 1
        let dni = res.data.hospitalizations[index]['patient']
        let doctor = res.data.hospitalizations[index]['doctor']
        dispatch('patient/obtainPatient', { token, dni }, { root:true })
        let email = res.data.email
        axios({
          method: 'get',
          url: `http://127.0.0.1:8000/api/doctor/${doctor}/`,
          headers: { 'Authorization': `JWT ${token}` },
        })
        .then(res => {
          commit('setDoctor', res.data)
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
