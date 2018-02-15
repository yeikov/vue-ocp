import * as firebase from 'firebase'

export default {
  state: {
    loadedConvocatorias: [
      /* {
        imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
        id: 'asdff234sdf',
        title: 'Convocatoria in New York',
        date: new Date(),
        location: 'New York',
        description: 'Convocatoria in New York'
      },
      {
        imageUrl: 'https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/2050/SITours/escapada-de-un-d-a-a-londres-desde-par-s-en-eurostar-con-un-crucero-in-paris-408425.jpg',
        id: '43qqwerqw',
        title: 'London',
        date: new Date(),
        location: 'City',
        description: 'It\'s London!'
      } */
    ]
  },
  mutations: {
    setLoadedConvocatorias (state, payload) {
      state.loadedConvocatorias = payload
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
    loadConvocatorias ({commit}) {
      console.log('loadConvocatorias')
      commit('setLoading', true)
      firebase.database().ref('convocatorias').once('value')
        .then((data) => {
          const convocatorias = []
          const obj = data.val()
          for (let key in obj) {
            // console.log(obj[key].imageUrl)
            convocatorias.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              imageUrl: obj[key].imageUrl,
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
    },
    createConvocatoria ({commit, getters}, payload) {
      const convocatoria = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      // Reach out to firebase and store it
      firebase.database().ref('convocatorias').push(convocatoria)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('convocatorias/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          console.log(imageUrl)
          return firebase.database().ref('convocatorias').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createConvocatoria', {
            ...convocatoria,
            imageUrl: imageUrl,
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
    }
  },
  getters: {
    loadedConvocatorias (state) {
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
