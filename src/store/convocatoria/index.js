import * as firebase from 'firebase'

export default {
  state: {
    loadedConvocatorias: [
      /* {
        id: 'asdff234sdf',
        title: 'Convocatoria in New York',
        date: new Date(),
        location: 'New York',
        description: 'Convocatoria in New York'
      },
      {
        id: '43qqwerqw',
        title: 'London',
        date: new Date(),
        location: 'City',
        description: 'It\'s London!'
      } */
    ]
  },
  mutations: {
    /* setLoadedConvocatorias (state, payload) {
      state.loadedConvocatorias = payload
    }, */
    setConvocatoriasUsuario (state, payload) {
      state.loadedConvocatorias = payload
    },
    clearConvocatorias (state) {
      state.loadedConvocatorias = []
    },
    createConvocatoria (state, payload) {
      state.loadedConvocatorias.push(payload)
    },
    updateConvocatoria (state, payload) {
      const convocatoria = state.loadedConvocatorias.find(convocatoria => {
        return convocatoria.id === payload.id
      })
      if (payload.title) {
        convocatoria.title = payload.title
      }
      if (payload.description) {
        convocatoria.description = payload.description
      }
      if (payload.date) {
        convocatoria.date = payload.date
      }
    }
  },
  actions: {
    /* loadConvocatorias ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('convocatorias').once('value')
        .then((data) => {
          const convocatorias = []
          const obj = data.val()
          console.log('loadConvocatorias')
          console.log(obj)
          for (let key in obj) {
            convocatorias.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              date: obj[key].date,
              description: obj[key].description,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedConvocatorias', convocatorias)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    }, */
    createConvocatoria ({commit, getters}, payload) {
      const convocatoria = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let key
      // Reach out to firebase and store it
      firebase.database().ref('convocatorias').push(convocatoria)
        .then((data) => {
          key = data.key
          return key
        })
        .then(() => {
          commit('createConvocatoria', {
            ...convocatoria,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateConvocatoriaData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('convocatorias').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateConvocatoria', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadConvocatoriasUsuario ({commit, getters}) {
      console.log('va')
      commit('setLoading', true)
      firebase.database().ref('convocatorias').once('value')
        .then((data) => {
          const convocatorias = []
          const obj = data.val()
          console.log('loadConvocatoriasUsuario')
          console.log(getters.user.id)
          for (let key in obj) {
            if (obj[key].creatorId === getters.user.id) {
              convocatorias.push({
                id: key,
                title: obj[key].title,
                location: obj[key].location,
                date: obj[key].date,
                description: obj[key].description,
                creatorId: obj[key].creatorId
              })
            }
          }
          console.log(getters.user.id)
          commit('setConvocatoriasUsuario', convocatorias)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    /* no emplear */
    loadedConvocatorias (state) {
      return state.loadedConvocatorias.sort((convocatoriaA, convocatoriaB) => {
        return convocatoriaA.date > convocatoriaB.date
      })
    },
    convocatoriasUsuario (state, getters, actions) {
      return state.loadedConvocatorias.sort((convocatoriaA, convocatoriaB) => {
        return convocatoriaA.date > convocatoriaB.date
      })
    },
    featuredConvocatorias (state, getters) {
      return getters.loadedConvocatorias.slice(0, 5)
    },
    loadedConvocatoria (state) {
      return (convocatoriaId) => {
        return state.loadedConvocatorias.find((convocatoria) => {
          return convocatoria.id === convocatoriaId
        })
      }
    }
  }
}
