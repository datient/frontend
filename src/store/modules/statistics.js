import axios from '../../plugins/axios.js'

const state = {
  colors: [],
  data: [],
  diagnosis: [],
  total: null,
}

const mutations = {
  resetStatistics(state) {
    state['colors'] = []
    state['data'] = []
    state['diagnosis'] = []
  },
  setStatistics(state, { statistics, total }) {
    statistics.forEach(diagnosis => {
      state['colors'].push(diagnosis['color'])
      state['data'].push(diagnosis['total'])
      state['diagnosis'].push(diagnosis['diagnosis'])
      state['total'] = total
    })
  },
}

const actions = {
  retrieveStatistics({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `/statistics/`,
        headers: { 'Authorization' : `JWT ${rootState.user.token}` }
      })
      .then(res => {
        let statistics = res['data']['data']
        commit('setStatistics', {
          statistics: statistics,
          total:  res['data']['total'],
        })
        resolve(statistics)
      })
      .catch(err => {
        reject(err.response['data'])
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
