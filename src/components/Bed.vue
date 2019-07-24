<template>
  <div id="toolbar">
    <v-card round class="cardBed">
      <v-toolbar class="toolbarSalas">
          <v-toolbar-title class="titleSalas">Cama {{ bedId }}</v-toolbar-title>
          <v-card-title>Medico a cargo: {{ user.email }} </v-card-title>
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
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile>
              {{ patient.dni }}
            </v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile>      
              {{ patient.last_name }}
            </v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile>
              {{ patient.first_name }}
            </v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile>
              {{ patient.last_name }}
            </v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile>
              {{ patient.age }}
            </v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile>
              {{ patient.birth_date }}
            </v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile>
              {{ patient.gender }}
            </v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile>
              {{ patient.income_diagnosis }}
            </v-list-tile>
          </v-list-tile-content>
        </v-list-tile>
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
    ...mapState(['patient', 'user'])
  },
  mounted() {
    let bedId = this.bedId
    let token = this.user.token
    this.$store.dispatch('patient/obtainPatient', { token, bedId })
  },
}
</script>

<style>
.cardBed{
  border-radius: 10px;
}
</style>
