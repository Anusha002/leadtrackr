import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


import Vue from 'vue'
import VueOnsen from 'vue-onsenui'; 
import App from './App.vue';
import router from './router';
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false
Vue.use(VueOnsen);
Vue.use(VCalendar, {
  firstDayOfWeek: 1
  })

  Vue.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBhLNeO_e-zwK3qWM8_1GEKzLXQ2k7oeA0",
      libraries: "places"
    }
  });  

new Vue({
  router,	
  render: h => h(App),
}).$mount('#app')
