<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
          indeterminate 
          color="primary"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 sm10 md8>
        <v-card class="">
          <v-card-title>
            <h3 class="primary--text">{{ convocatoria.title }}</h3>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-convocatoria-details-dialog :convocatoria="convocatoria"></app-edit-convocatoria-details-dialog>
            </template>
          </v-card-title>
          <!-- <v-card-text class="">
            <div class="info--text">{{ convocatoria.date | date }} - {{ convocatoria.location }}</div>
            <div>
              <app-edit-convocatoria-date-dialog :convocatoria="convocatoria" v-if="userIsCreator"></app-edit-convocatoria-date-dialog>
              <app-edit-convocatoria-time-dialog :convocatoria="convocatoria" v-if="userIsCreator"></app-edit-convocatoria-time-dialog>
            </div>
            <div>{{ convocatoria.description }}</div>
          </v-card-text> -->
          <v-card-text>
              
              <p>{{convocatoria.location}}</p>
              <p>{{convocatoria.description}}</p>
              <p>{{convocatoria.dayOfWeek}}</p>
              <p>{{convocatoria.hour}}</p>
              <p>Creation: {{ creationDate | date }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-convocatoria-dialog 
            :convocatoriaId="convocatoria.id"
            v-if="userIsAuthenticated && !userIsCreator"></app-register-convocatoria-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>  
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      convocatoria () {
        return this.$store.getters.loadedConvocatoria(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.convocatoria.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

