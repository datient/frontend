import axios from '../../plugins/axios.js'

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
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: '/api/room/',
        headers: { 'Authorization': `JWT ${token}` }
      })
      .then(res => {
        res['data'].forEach(room => {
          room['is_available'] = false
        })
        commit('setRooms', res.data)
        resolve(res.data)
      })
      .catch(err => {
        reject(err.response.data)
      })
      
    })
  },
  haveBedAvailable({commit}, rooms){
    rooms.forEach(room => {
      room.beds.forEach(bed => {
        if (bed['is_available']) {
          room['is_available'] = true
        }
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
