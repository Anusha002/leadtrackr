import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


import Vue from 'vue'
import VueOnsen from 'vue-onsenui'; 
import App from './App.vue';
import router from './router';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

Vue.config.productionTip = false
Vue.use(VueOnsen);
Vue.use(VCalendar, {
  firstDayOfWeek: 1
  })

new Vue({
  router,	
  render: h => h(App),
}).$mount('#app')
