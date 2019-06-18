import Vue from 'vue'
import './plugins/vuetify'
import router from './plugins/router'
import store from './store/index'
import App from './App.vue'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  switch (to.name) {
    case 'home':
      store.state.user.token === null ? next({ name: 'login' }) : null
      break
    case 'login':
      store.state.user.token !== null ? next({ name: 'home' }) : null
      break
    case 'register':
      store.state.user.token !== null ? next({ name: 'home' }) : null
      break
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
