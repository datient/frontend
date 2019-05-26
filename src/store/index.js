import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import rooms from './modules/rooms'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    rooms,
    user,
  },
  plugins: [createPersistedState()],
})
