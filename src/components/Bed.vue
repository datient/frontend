<template>
  <div id="room">
    <v-card class="cardBed">
      <v-toolbar dense>
        <v-toolbar-title>Cama {{ bedId }}</v-toolbar-title>
        <v-spacer/>
        <v-icon>person</v-icon>
        <v-toolbar-title v-if="hospitalization.doctor != null">
          {{ hospitalization.doctor.first_name }} {{ hospitalization.doctor.last_name }}
        </v-toolbar-title>
      </v-toolbar>
      <v-container v-if="hospitalization.error != null">
        <v-spacer/>
        <v-layout>
          <v-flex xs11>
            <v-card-text>{{ hospitalization.error }}</v-card-text>
          </v-flex>
          <v-flex xs1>
            <div class="text-center">
              <v-dialog
                v-model="dialog"
                width="500">
                <template v-slot:activator="{ on }">
                  <v-btn class="mx-2" fab dark color="indigo" v-on="on">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title>
                    Agregar paciente a la cama
                  </v-card-title>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-select
                        v-model="select"
                        :items="patient.patients"
                        item-text="last_name"
                        label="Seleccione un paciente para asignar a la cama"
                        return-object/>
                    </v-flex>
                  </v-layout>
                  <v-divider/>
                  <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      color="primary"
                      text
                      @click="assignPatient">
                      Asignar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-flex>
          </v-layout>
      </v-container>
      
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
  methods: {
    assignPatient() {
      let bedId = this.bedId
      let token = this.user.token
      let doctorId = this.user.id
      let patientDni = this.select.dni
      this.$store.dispatch('hospitalization/createHospitalization', {
        token,
        bedId,
        doctorId,
        patientDni
      })
      .then(() => {
        this.$router.go()
      })
      this.dialog = false
    },
  },
}
</script>

<style>
.cardBed{
  color: white;
  border-radius: 10px;
}
</style>
