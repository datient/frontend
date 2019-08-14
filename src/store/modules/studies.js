import axios from 'axios'

const state = {
  studies: null,
  indexTab: null
}

const mutations = {
  setStudies(state, studies) {
    state.studies = studies
  },
  setIndexTab(state,indexTab) {
    state.indexTab = indexTab
  }
}

const actions = {
  obtainComplementaryStudies({ commit }, { token }) {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/study/`,
      headers: { 'Authorization': `JWT ${token}` },
    })
    .then(res => {
      commit('setStudies',res.data)
    })
  },
  createComplementaryStudy({ commit }, { token, dni, files }){
    return new Promise((resolve, reject) => {
      files.forEach(image => {
        let formData = new FormData()
        formData.append('image', image)
        formData.append('patient', dni)
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/api/study/`,
          headers: {
            'Authorization': `JWT ${token}`,
            'Content-Type' : 'multipart/form-data'
          },
          data: formData,
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.response.data.image[0])
        })
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
