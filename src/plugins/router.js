import Vue from 'vue'
import VueRouter from 'vue-router'
import Base from '../components/Base'
import Bed from '../components/Bed'
import Detailview from '../components/Detailview'
import Home from '../components/Home'
import Patients from '../components/Patients'
import Register from '../components/Register'
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
      { path: '/bed/:id', name: 'bed', component: Bed, meta: { title: 'Cama' } },
      { path: '/detailview/:id', name: 'detailview', component: Detailview, meta: { title: 'Vista detallada' } },
      { path: '/patients', name: 'patients', component: Patients, meta: { title: 'Pacientes' } },
    ]
  },
  { path: '/login', name: 'login', component: Login, meta: { title: 'Login' } },
  { path: '/register', name: 'register', component: Register, Register, meta: { title: 'Register' } },
]

export default new VueRouter({
  routes,
  mode: 'history'
})
