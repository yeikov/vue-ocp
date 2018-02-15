<template>  
  <v-dialog persistent v-model="registerDialog">
    <v-btn
      color="primary"
      slot="activator"
      >
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
      <v-icon right dark>list</v-icon>
    </v-btn>
    <v-card>
      <v-container> 
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from Convocatoria?</v-card-title>
            <v-card-title v-else>Register for Convocatoria?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
              class="red--text darken-1"
              flat
              @click="registerDialog = false"
              >Cancel</v-btn>
              <v-btn
              class="green--text darken-1"
              flat
              @click="onAgree"
              >Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        registerDialog: false
      }
    },
    props: ['convocatoriaId'],
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredConvocatorias.findIndex(convocatoriaId => {
          return convocatoriaId === this.convocatoriaId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('unregisterUserFromConvocatoria', this.convocatoriaId)
        } else {
          this.$store.dispatch('registerUserForConvocatoria', this.convocatoriaId)
        }
      }
    }
  }
</script>