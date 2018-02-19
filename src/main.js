import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import * as firebase from 'firebase'

import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import { secret } from '../ignoreFileSession'
import AlertComp from './components/Shared/Alert'
// import AlertCmp from './components/Shared/Alert.vue' ??
import EditConvocatoriaDetailsDialog from './components/Convocatoria/Edit/EditConvocatoriaDetailsDialog.vue'
import EditConvocatoriaDateDialog from './components/Convocatoria/Edit/EditConvocatoriaDateDialog.vue'
import EditConvocatoriaTimeDialog from './components/Convocatoria/Edit/EditConvocatoriaTimeDialog.vue'
import RegisterDialog from './components/Convocatoria/Registration/RegisterDialog.vue'

/* ignoreFileSession.js inscrito en gitignore. contiene:
export const secret = {apiKey: '****',
  authDomain: '****',
  databaseURL: '****',
  projectId: '****',
  storageBucket: '****'}
*/

console.log(secret)
// Vue.use(Vuetify)
Vue.use(Vuetify, {
  theme: {
    /*
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
    */
  }
})
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComp)
Vue.component('app-edit-convocatoria-details-dialog', EditConvocatoriaDetailsDialog)
Vue.component('app-edit-convocatoria-date-dialog', EditConvocatoriaDateDialog)
Vue.component('app-edit-convocatoria-time-dialog', EditConvocatoriaTimeDialog)
Vue.component('app-register-convocatoria-dialog', RegisterDialog)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp(secret)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadConvocatoriasUsuario')
  }
})
