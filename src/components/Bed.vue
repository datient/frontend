<template>
  <div id="room">
    <v-card round class="cardBed">
      <v-toolbar class="toolbarSalas">
          <v-toolbar-title class="titleSalas">Cama {{ bedId }}</v-toolbar-title>
          <v-card-title>Medico a cargo: {{ hospitalization.doctor.last_name }} {{hospitalization.doctor.first_name}} </v-card-title>
      <div class="text-xs-center">
        <v-dialog
          v-model="dialog"
          width="500">
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Agregar un paciente
            </v-card-title>
            <v-container fluid>
              <v-layout wrap>
                <v-flex xs12>
                  <v-combobox
                    v-model="select"
                    :items="patient.last_name"
                    label="Seleccione uno de los pacientes disponibles para anadirlo a la cama"
                  ></v-combobox>
                </v-flex>      
              </v-layout>
            </v-container>
           
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="dialog = false"
              >
                Agregar
              </v-btn>                                                                                                                                      
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-toolbar>
    <div id="room">
      <v-list>
        <v-container grid-list-md>
          <v-layout>
            <v-flex xs3>
              <v-card-text>Nombre Completo</v-card-text>
            </v-flex>
            <v-flex xs6 grid-list-md text-xs-center>
              <v-card dark tile flat color="#2e7d32">
                <v-card-text>{{ patient.first_name }} {{ patient.last_name }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>           
              <v-card-text>Edad</v-card-text>
            </v-flex>
            <v-flex xs6 grid-list-md text-xs-center>
              <v-card dark tile flat color="#388e3c">
                <v-card-text>{{ patient.age }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <v-card-text>Dni</v-card-text>
            </v-flex>
            <v-flex xs6 grid-list-md text-xs-center>
              <v-card dark tile flat color="#2e7d32">
                <v-card-text>{{ patient.dni }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <v-card-text>Fecha de Nacimiento</v-card-text>
            </v-flex>
            <v-flex xs6 grid-list-md text-xs-center>
              <v-card dark tile flat color="#388e3c">
                <v-card-text>{{ patient.birth_date }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <v-card-text>Genero del Paciente</v-card-text>
            </v-flex>
            <v-flex xs6 grid-list-md text-xs-center>
              <v-card dark tile flat color="#2e7d32">
                <v-card-text>{{ patient.gender }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <v-card-text>Edad</v-card-text>
            </v-flex>
            <v-flex xs6 grid-list-md text-xs-center>
              <v-card dark tile flat color="#388e3c">
                <v-card-text>{{ patient.age }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs3>
              <v-card-text>Diagnostico</v-card-text>
            </v-flex>
            <v-flex xs6 grid-list-md text-xs-center>
              <v-card dark tile flat color="#2e7d32">
                <v-card-text>{{ patient.income_diagnosis }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>  
      </v-list>
      </div>
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
    ...mapState(['hospitalization' ,'patient', 'user'])
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
