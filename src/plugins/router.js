import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../components/Base'
import Home from '../components/Home'
import Login from '../components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Base,
    children: [
      { path: '', name: 'home', component: Home },
    ]
  },
  { path: '/login', name: 'login', component: Login },
]

export default new VueRouter({
  routes,
  mode: 'history'
})
