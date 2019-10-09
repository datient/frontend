import axios from 'axios'

const state = {
  id: null,
  name: null ,
  room: null ,
  is_available: null
}

const mutations = {
  setBed(state, bed) {
    state.id = bed['id']
    state.name = bed['name']
    state.room = room['room']
    state.is_available = bed['is_available']
  }
}
const actions = {
  obtainBed({ commit, rootState }, { id }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/bed/${id}/`,
        headers: { 'Authorization': `JWT ${rootState.user.token}` },
      })
      .then(res => {
        commit('setBed', res.data)
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
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
