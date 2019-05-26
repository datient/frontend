import axios from 'axios'

const state = {
  rooms: null
}

const mutations = {
  setRooms(state, rooms) {
    state.rooms = rooms
  }
}

const actions = {
  obtainRooms({ commit }, token) {
    console.log(token)
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/room/',
      headers: { 'Authorization': `JWT ${token}` }
    })
    .then(res => {
      commit('setRooms', res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
