import axios from '../../plugins/axios.js'

const state = {
  plans: []
}

const mutations = {
  setPlans(state, plans) {
    state.plans = plans
  },
}

const actions = {
  createPlan({ rootState }, { title, description, patientDni }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `/api/plans/`,
        headers: { 'Authorization': `JWT ${rootState.user.token}` },
        data: {
          title: title,
          description: description,
          patient: patientDni
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
  deletePlan({ rootState }, { planId }) {
    return new Promise ((resolve, reject) => {
      axios({
        method: 'delete',
        url: `/api/plans/${planId}/`,
        headers: { 'Authorization': `JWT ${rootState.user.token}` },
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.response.data)
      })
    })
  },
  editPlan({ rootState }, { planId, title, description, patientDni }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url: `/api/plans/${planId}/` ,
        headers: { 'Authorization': `JWT ${rootState.user.token}` },
        data: {
          title: title,
          description: description,
          patient: patientDni
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
  obtainPlans({ commit, rootState }, { patientDni }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `/api/patient/${patientDni}/`,
        headers: { 'Authorization': `JWT ${rootState.user.token}` },
      })
      .then(res => {
        commit('setPlans', res.data.plans)
        resolve(res.data.plans)
      })
      .catch(err => {
        reject(err.response.data)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
