import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import statistics from './modules/statistics'
import bed from './modules/bed'
import studies from './modules/studies'
import hospitalization from './modules/hospitalization'
import patient from './modules/patient'
import plan from './modules/plan'
import progress from './modules/progress'
import rooms from './modules/rooms'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    statistics,
    bed,
    studies,
    hospitalization,
    patient,
    plan,
    progress,
    rooms,
    user,
  },
  plugins: [createPersistedState()],
})
