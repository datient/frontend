import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../components/Base'
import Home from '../components/Home'
import Room from '../components/Room'
import Login from '../components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Base,
    children: [
      { path: '', name: 'home', component: Home },
      { path: '/room/:id', name: 'room', component: Room },
    ]
  },
  { path: '/login', name: 'login', component: Login },
]

export default new VueRouter({
  routes,
  mode: 'history'
})
