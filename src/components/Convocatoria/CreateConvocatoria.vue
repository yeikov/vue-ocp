<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create a new Convocatoria</h4>
      </v-flex>  
    </v-layout>   
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateConvocatoria">
          <v-layout row>
            <v-flex xs12 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required>  
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required>  
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multi-line
                >  
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 offset-sm3>
              <h4>Choose Data & Time</h4>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
              <!-- <p>{{ date | date }}</p> -->
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
              <!-- <p>{{ time | date }}</p> -->
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-btn 
                class="primary" 
                :disabled="!formIsValid"
                type="submit">Create Convocatoria</v-btn>
                {{ submittableDateTime | date }}
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        title: '',
        location: '',
        description: '',
        date: new Date().toISOString(), // '', // new Date(),
        time: new Date()
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
        this.location !== '' &&
        this.description !== ''
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        // console.log('date: ' + date)
        return date
      }
    },
    methods: {
      onCreateConvocatoria () {
        if (!this.formIsValid) { return };
        const convocatoriaData = {
          title: this.title,
          location: this.location,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createConvocatoria', convocatoriaData)
        this.$router.push('/convocatorias')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      }
    }
  }
</script>