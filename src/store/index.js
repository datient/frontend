import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import patient from './modules/patient'
import rooms from './modules/rooms'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    patient,
    rooms,
    user,
  },
  plugins: [createPersistedState()],
})
