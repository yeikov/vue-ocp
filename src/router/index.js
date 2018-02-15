import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Convocatorias from '@/components/Convocatoria/Convocatorias'
import Convocatoria from '@/components/Convocatoria/Convocatoria'
import CreateConvocatoria from '@/components/Convocatoria/CreateConvocatoria'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/convocatorias',
      name: 'Convocatorias',
      component: Convocatorias
    },
    {
      path: '/convocatoria/new',
      name: 'CreateConvocatoria',
      component: CreateConvocatoria,
      beforeEnter: AuthGuard
    },
    {
      path: '/convocatorias/:id',
      name: 'Convocatoria',
      props: true,
      component: Convocatoria
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ],
  mode: 'history'
})
