<template>
  <div id="room">
    <!-- <v-card round class="cardBed"> -->
    <v-card class="cardBed">
      <v-toolbar dense>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Cama {{ bedId }}</v-toolbar-title>
       
        <v-spacer></v-spacer>
        
        <v-icon>person</v-icon>
        <v-toolbar-title v-if="hospitalization.doctor != null">
          {{ hospitalization.doctor.first_name }} {{ hospitalization.doctor.last_name }}
        </v-toolbar-title>
      </v-toolbar>  
      <h1 v-if="hospitalization.error != null">{{ hospitalization.error }}</h1>
      <v-container grid-list-xl text-center v-if="patient.dni != null">
        <v-layout>
          <v-flex xs3 offset-xs3>
              <v-card-text >Nombre: {{ patient.last_name }} {{ patient.first_name }}</v-card-text>
          </v-flex>
          <v-flex xs3>
              <v-card-text >Edad: {{ patient.age }}</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs3 offset-xs3>
              <v-card-text >Dni: {{ patient.dni }}</v-card-text>
          </v-flex>
          <v-flex xs3>
              <v-card-text >Fecha de Nacimiento: {{ patient.birth_date }}</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs3 offset-xs3>
              <v-card-text >Genero: {{ patient.gender }}</v-card-text>
          </v-flex>
          <v-flex xs3>
              <v-card-text >Diagnostico: {{ patient.income_diagnosis }}</v-card-text>
          </v-flex>
        </v-layout>
      </v-container>  
    
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
