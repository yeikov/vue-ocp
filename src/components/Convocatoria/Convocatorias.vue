<template>
  <v-container>
    <v-layout row wrap v-for="convocatoria in convocatorias" :key="convocatoria.id" class="mb-2">
      <v-flex xs12 sm9 md6>
        <v-card class="">

          <v-container fluid>
            <v-layout row>
              <v-flex xs7 sm8 md9>
                  <v-card-title>
                  <div>
                    <h5 class="primary--text mb-10">{{convocatoria.title}}</h5>
                    <!-- <div>{{ convocatoria.date | date }}</div> -->
                    <p>{{convocatoria.description}}</p>
                  </div>
                  </v-card-title>
                  <v-card-text>
                    <p>Every {{convocatoria.dayOfWeek}} at {{convocatoria.hour}}</p>
                    <p v-if="convocatoria.location!=''">on {{convocatoria.location}}</p>
                    <p></p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="primary" flat v-bind:to="'/convocatorias/'+convocatoria.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Convocatoria
                    </v-btn>
                  </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>  
</template>

<script>
  export default {
    computed: {
      convocatorias () {
        return this.$store.getters.convocatoriasUsuario
      }
    }
  }
</script>
