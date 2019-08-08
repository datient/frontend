import axios from 'axios'

const state = {
  studies: null,
  indexTab: null
}

const mutations = {
  setStudies(state, studies){
    state.studies = studies
  },
  setIndexTab(state,indexTab){
    state.indexTab = indexTab
  }

}

const actions = {
  obtainComplementaryStudies({ commit }, { token } ){
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/study/`,
      headers: { 'Authorization': `JWT ${token}` },
    })
    .then(res => {
      commit('setStudies',res.data)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
