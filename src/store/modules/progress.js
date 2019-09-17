import axios from 'axios'

const state = {
  progress: null,
  status: null
}

const mutations = {
  setProgress(state, progress) {
    state.progress = progress
    if (state.progress.length >= 1) {
      state.progress.forEach(p => {
        if (p.status === 0) {
          p.status = 'Bien'
        } else if (p.status === 1) {
          p.status = 'Precaucion'
        } else if (p.status === 2) {
          p.status = 'Peligro'
        } else {
          p.status = null
        }
        p.created_at = new Date(p.created_at).toLocaleString()
      });
    } else {
      state.progress = [
        {
          diagnosis: null,
          has_left: true,
        }
      ]
    }
}
}

const actions = {
  createProgress({ rootState }, { patientDni, progress }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/progress/',
        headers: { 'Authorization': `JWT ${rootState.user.token}` },
        data: {
          diagnosis: progress['diagnosis'],
          description: progress['description'],
          status: progress['status'],
          has_left: progress['has_left'],
          income: progress['income'],
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
  obtainProgress({ commit, rootState }, { patientDni }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/patient/${patientDni}/`,
        headers: { 'Authorization': `JWT ${rootState.user.token}` },
      })
      .then(res => {
        commit('setProgress', res.data)
        resolve(res)
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
