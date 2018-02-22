<template>
  <v-container>
    <!-- <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create a new Convocatoria</h4>
      </v-flex>  
    </v-layout> -->   
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-form>
          <v-card>
            <v-card-title><h3>Create a new Convocatoria</h3></v-card-title>
            <!-- <form @submit.prevent="onCreateConvocatoria"> -->
            <v-card-text>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required>  
              </v-text-field>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                >  
              </v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="description"
                multi-line
                >  
              </v-text-field>
              <h4>Choose Day & Time</h4>
              <!-- <v-text-field
                name="dayOfWeek"
                label="Day of week"
                id="dayOfWeek"
                v-model="dayOfWeek"
                required
                >  
              </v-text-field> -->
              <v-flex xs12 sm8 offset-sm4>
                <v-select
                  :items="days"
                  :filter="customFilter"
                  v-model="dayOfWeek"
                  item-text="name"
                  item-value="id"
                  label="Day of week"
                  autocomplete
                ></v-select>
              </v-flex>
              <!-- <v-text-field
                name="hour"
                label="Hour"
                id="hour"
                v-model="hour"
                required
                >  
              </v-text-field> -->
              <v-flex xs12 sm3 offset-sm4>
                <!--<v-dialog
                  ref="dialog"
                  persistent
                  v-model="timeModal"
                  lazy
                  full-width
                  width="290px"
                  :return-value.sync="time"
                  >
                  <v-text-field
                    slot="activator"
                    label="Time"
                    v-model="time"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                   <v-card>
                    <v-time-picker v-model="editableTime" style="width:100%" actions format="24hr">
                      
                    </v-time-picker>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat class="secondary" @click="timeModal = false">Close</v-btn>
                      <v-btn flat class="primary" @click="onSaveChanges">Save</v-btn>
                    </v-card-actions>
                  </v-card>   
                </v-dialog>-->
              </v-flex> 

              <p>Creation: {{ creationDate | date }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="clear">clear</v-btn>
            <v-btn 
                class="primary" 
                :disabled="!formIsValid"
                @click="onCreateConvocatoria">Create Convocatoria</v-btn>
            
          </v-card-actions>
         </v-card>
        </v-form>
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
        creationDate: new Date().toISOString(), // '', // new Date(),
        modificationDate: '',
        dayOfWeek: null,
        time: null,
        annualExceptions: [],
        punctualExceptions: [],
        annualAmendments: [],
        subscribed: [],
        enrolment: [],

        timeModal: false,
        editableTime: null,

        days: [
          { name: 'Moonday', abbr: 'M', id: 1 },
          { name: 'Thuesday', abbr: 'T', id: 2 },
          { name: 'Wednesday', abbr: 'W', id: 3 },
          { name: 'Thursday', abbr: 'Th', id: 4 },
          { name: 'Friday', abbr: 'F', id: 4 },
          { name: 'Saturday', abbr: 'S', id: 4 },
          { name: 'Sunday', abbr: 'Su', id: 5 }
        ],
        customFilter (item, queryText, itemText) {
          const hasValue = val => val != null ? val : ''
          const text = hasValue(item.name)
          const query = hasValue(queryText)
          return text.toString()
            .toLowerCase()
            .indexOf(query.toString().toLowerCase()) > -1
        }
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
        this.dayOfWeek !== null &&
        this.time !== null
      }
      /* submittableDateTime () {
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
      } */
    },
    methods: {
      onCreateConvocatoria () {
        console.log('chiva')
        if (!this.formIsValid) { return };
        const convocatoriaData = {
          title: this.title,
          location: this.location,
          description: this.description,
          modificationDate: this.modificationDate,
          creationDate: this.creationDate,
          dayOfWeek: this.dayOfWeek,
          time: this.time,
          annualExceptions: this.annualExceptions,
          punctualExceptions: this.punctualExceptions,
          annualAmendments: this.annualAmendments,
          subscribed: this.subscribed,
          enrolment: this.enrolment
        }
        this.$store.dispatch('createConvocatoria', convocatoriaData)
        this.$router.push('/convocatorias')
      },
      onSaveChanges () {
        // console.log(this.time)
        this.time = this.editableTime
        this.timeModal = false
      },
      clear () {
        this.$refs.form.reset()
      }
      /* ,
      created () {
        this.editableTime = new Date(this.convocatoria.date).toTimeString()
      } */
    }
  }
</script>