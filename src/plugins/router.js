import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../components/Base'
import Bed from '../components/Bed'
import Home from '../components/Home'
import Room from '../components/Room'
import Login from '../components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Base,
    children: [
      { path: '', name: 'home', component: Home, meta: { title: 'Home' } },
      { path: '/room/:id', name: 'room', component: Room, meta: { title: 'Sala' } },
      { path: '/bed/:id', name: 'bed', component: Bed },
    ]
  },
  { path: '/login', name: 'login', component: Login, meta: { title: 'Login' } },
]

export default new VueRouter({
  routes,
  mode: 'history'
})
