<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right"> 
        <v-btn large router to="/convocatorias" >Explore Convocatorias</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left"> 
        <v-btn large router to="/convocatoria/new">Organize Convocatoria</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
          indeterminate 
          color="primary"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center"> 
        <p>Join our awesome convocatorias!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    computed: {
      convocatorias () {
        return this.$store.getters.featuredConvocatorias
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onLoadConvocatoria (id) {
        this.$router.push('/convocatorias/' + id)
      }
    }
  }
</script>

<style scoped>
  .title{
    position: absolute;
    bottom: 50px;
    color: white;
    background-color: rgba(0,0,0,0.5);
  }
</style>