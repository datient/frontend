import Vue from 'vue'
import './plugins/vuetify'
import router from './plugins/router'
import store from './store/index'
import App from './App.vue'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    if (store.state.user.token === null) {
      next({ name: 'login' })
    }
  }
  if (to.name === 'login') {
    if (store.state.user.token !== null) {
      next(from.path)
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
