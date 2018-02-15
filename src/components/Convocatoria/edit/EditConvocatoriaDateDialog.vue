<template>  
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn
      color="info"
      slot="activator"
    >
      Edit Date
      <v-icon right dark>event</v-icon>
    </v-btn>
    <v-card>
      <v-container> 
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Convocatoria Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate" style="width:100%" actions>
              <template slot-scope="{save, cancel}">
                <v-btn flat class="blue--text darken-1" @click.native="editDialog = false">Close</v-btn>
                <v-btn flat class="blue--text darken-1" @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['convocatoria'],
    data () {
      return {
        editDialog: false,
        editableDate: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.convocatoria.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateConvocatoriaData', {
          id: this.convocatoria.id,
          date: newDate
        })
      }
    },
    created () {
      this.editableDate = new Date(this.convocatoria.date).toISOString()
    }
  }
</script>