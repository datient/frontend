<template>
  <div>
    <v-container fluid grid-list-sm>
      <v-layout class="grid" wrap>
        <v-flex lg11>
          <v-icon>calendar_today</v-icon>
          Fecha de ingreso: {{ hospitalization.entry_at }}
        </v-flex>
        <v-flex lg4>
          <v-icon>calendar_today</v-icon>
          Dias internado: {{ hospitalization.boarding_days }} 
        </v-flex>
        <v-flex lg12>
          <v-row class="row">
            <v-flex lg1>
              <v-icon>show_chart</v-icon>
                Evolucion:
            </v-flex>
            <v-flex lg11>
              <v-dialog v-if = "!progress.progress[0].has_left" v-model="dialog" width="800">
                <template v-slot:activator="{ on }">
                  <v-btn fab dark small color="indigo" v-on="on">
                    <v-icon dark>post_add</v-icon>
                  </v-btn>  
                </template>
                <v-card>
                  <v-card-title class="headline" primary-title>Nuevo Progreso</v-card-title>
                  <v-card-text>
                    <v-container class="form" grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-text-field
                            v-model="progressForm.diagnosis"
                            id="diagnosis"
                            label="Diagnostico"
                            :error-messages="errorDiagnosis"
                            type="text"/>
                        </v-flex>
                        <v-flex xs12 md12>
                          <v-textarea
                            rows=3
                            v-model="progressForm.description"
                            id="description"
                            label="Descripcion"/>
                        </v-flex>    
                        <v-flex xs12 md12>  
                          <v-select
                            v-model="progressForm.status"
                            label="Estado"
                            :items="[{text:'Bien',value:0},{text:'Precaucion',value:1},{text:'Peligro',value:2}]"
                            :error-messages="errorStatus"
                            id="status"/>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions class=card_actions>
                    <v-spacer/>
                    <v-btn
                      color="primary"
                      id="btn_add_progress"
                      text
                      @click="saveProgress">
                      Agregar
                    </v-btn>
                  </v-card-actions>   
                </v-card>  
              </v-dialog>                    
            </v-flex>
          </v-row>
          <v-list
            flat
            class="mx-auto scroll" 
            max-width="100%" 
            height="330"
            three-line
            v-if="progress.progress !== null && progress.progress[0].diagnosis !== null">
              <v-list-item v-for="progress in progress.progress"
                :key="progress.id">
                <template>
                  <v-list-item-content>
                    <v-list-item-title>{{ progress.created_at }}</v-list-item-title>
                    <v-layout style="margin: auto 0px;"> 
                      <v-flex lg2 style="margin-left: -2px;">
                        <v-list-item-title>{{ progress.diagnosis }}</v-list-item-title>
                      </v-flex>
                      <v-flex lg10>
                        <v-list-item-title v-if = "progress.has_left"> ( Dado de alta ) </v-list-item-title>
                        <v-list-item-title v-if = "progress.income"> ( Hospitalizado ) </v-list-item-title>
                      </v-flex>
                    </v-layout>
                    <v-list-item-subtitle>{{ progress.description }}</v-list-item-subtitle>
                    <v-list-item-subtitle> {{ progress.status }}</v-list-item-subtitle>
                    <v-divider></v-divider>
                  </v-list-item-content>
                </template>
              </v-list-item>
          </v-list>
          <v-flex v-if="progress.progress[0].diagnosis === null">No hay progresos registrados</v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Progress',
  props: ['dni'],
  data() {
    return {
      dialog: false,
      progressForm: {
        diagnosis: null,
        description: null,
        status: null,
        has_left: false
      },
      errorDiagnosis: null,
      errorStatus: null,
    }
  },
  computed: {
    ...mapState(['hospitalization', 'progress'])
  },
  methods: {
    saveProgress() {
      this.$store
        .dispatch('progress/createProgress', {
          patientDni: this.dni,
          progress: this.progressForm
        })
        .then(() => this.$router.go())
        .catch(err => {
          this.errorDiagnosis = err["diagnosis"]
          this.errorStatus = err["status"]
        })
    },
  }
}
</script>

<style>
.grid{
  grid-row-gap: 20px;
}
.row{
  margin-left: 0px !important;
}
.scroll{
  overflow-y: auto;
}
</style>
