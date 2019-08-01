import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import studies from './modules/studies'
import hospitalization from './modules/hospitalization'
import patient from './modules/patient'
import rooms from './modules/rooms'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    studies,
    hospitalization,
    patient,
    rooms,
    user,
  },
  plugins: [createPersistedState()],
})
