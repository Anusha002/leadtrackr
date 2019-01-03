import Vue from 'vue'
import Router from 'vue-router'
import VeeValidate from 'vee-validate';
import Login from '../pages/Login.vue'
import Splash from '../pages/Splash.vue'
import Dash from '../pages/Dash.vue'
import Addlead from '../pages/Addlead.vue'
import Followups from '../pages/Followups.vue'
import Addfollowup from '../pages/Addfollowup.vue'
import Leadlist from '../pages/Leadlist.vue'
import Container from '../pages/Container.vue'

Vue.use(Router)
Vue.use(VeeValidate)

export default new Router({
  routes: [
  {
    path: '/',
    name: 'splash',
    component: Splash
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dash',
    name: 'dash',
    component: Dash
  },
  {
    path: '/addlead',
    name: 'addlead',
    component: Addlead
  },
  {
    path: '/followups',
    name: 'followups',
    component: Followups
  },
  {
    path: '/addfollowup',
    name: 'addfollowup',
    component: Addfollowup
  },
  {
    path: '/leadlist',
    name: 'leadlist',
    component: Leadlist
  },
  {
    path: '/container',
    name: 'container',
    component: Container
  }

  ] 
})
