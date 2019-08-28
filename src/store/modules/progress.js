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
          has_left: false,
        }
      ]
    }
}
}

const actions = {
  obtainProgress({ commit }, { token }) {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/progress/`,
      headers: { 'Authorization': `JWT ${token}` },
    })
    .then(res => {
      commit('setProgress',res.data)
    })
  },
  createProgress({ commit }, { token, dni, progress }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/progress/',
        headers: { 'Authorization': `JWT ${token}` },
        data: {
          diagnosis: progress.diagnosis,
          description: progress.description,
          status: progress.status,
          has_left: progress.has_left,
          patient: dni
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
  }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
