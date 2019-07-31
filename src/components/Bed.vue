<template>
  <div id="room">
    <!-- <v-card round class="cardBed"> -->
    <v-card class="cardBed">
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Cama {{ bedId }}</v-toolbar-title>
       
        <v-spacer></v-spacer>
        
        <v-icon>person</v-icon>
        <v-toolbar-title>{{ patient.first_name }} {{ patient.last_name }}</v-toolbar-title>
      </v-toolbar>  
     
      <v-list>
        <v-container grid-list-md>
          <v-layout>
            <v-flex xs6>
              <v-card-text >Nombre Completo: </v-card-text>
            </v-flex>
          </v-layout>
          <v-flex xs6>
              <v-card-text > {{ patient.last_name }} </v-card-text>
            </v-flex>
        </v-container>  
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Bed',
  data () {
    return {
      bedId: this.$route.params.id,
      dialog: false,
      select: null,
    }
  },
  computed: {
    ...mapState(['hospitalization', 'patient', 'user'])
  },
  mounted() {
    let bedId = this.bedId
    let token = this.user.token
    this.$store.dispatch('hospitalization/obtainHospitalization', { token, bedId })
  },
}
</script>

<style>
.cardBed{
  border-radius: 10px;
}
</style>
