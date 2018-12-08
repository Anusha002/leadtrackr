import Vue from 'vue'
import Router from 'vue-router'
import VeeValidate from 'vee-validate';
import Login from '../pages/Login.vue'
import Splash from '../pages/Splash.vue'
import Dash from '../pages/Dash.vue'
import Addlead from '../pages/Addlead.vue'
import Leaddetail from '../pages/Leaddetail.vue'
import Leadlist from '../pages/Leadlist.vue'

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
    path: '/leaddetail',
    name: 'leaddetail',
    component: Leaddetail
  },
  {
    path: '/leadlist',
    name: 'leadlist',
    component: Leadlist
  }

  ] 
})
