import Vue from 'vue'
import Vuex from 'vuex'
import convocatoria from './convocatoria'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    convocatoria: convocatoria,
    user: user,
    shared: shared
  }
})
