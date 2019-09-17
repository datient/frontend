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
  createComplementaryStudy({ rootState }, { dni, files }){
    return new Promise((resolve, reject) => {
      files.forEach(image => {
        let formData = new FormData()
        formData.append('image', image)
        formData.append('patient', dni)
        axios({
          method: 'post',
          url: `http://127.0.0.1:8000/api/study/`,
          headers: {
            'Authorization': `JWT ${rootState.user.token}`,
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
  },
  obtainStudies({ commit, rootState }, { patientDni }) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/patient/${patientDni}/`,
        headers: { 'Authorization': `JWT ${rootState.user.token}` },
      })
      .then(res => {
        commit('setStudies',res.data['studies'])
        resolve(res.data['studies'])
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
