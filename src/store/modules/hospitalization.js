import axios from 'axios'

const state = {

}

const mutations = {
}

const actions = {
    obtainHospitalization({ commit, dispatch }, { token, bedId }){
        axios({
          method: 'get',
          url: `http://127.0.0.1:8000/api/bed/${bedId}/`,
          headers: { 'Authorization': `JWT ${token}` },
        })
        .then(res => {
          let index = res.data.hospitalizations.length - 1
          let dni = res.data.hospitalizations[index]['patient']
          dispatch('patient/obtainPatient',{ token, dni}, {root:true})
        })
}
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
