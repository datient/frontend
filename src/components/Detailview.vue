<template>
  <div id="detailview">
    <v-card round class="cardDetailview">
      <v-toolbar>
        <v-toolbar-title>
          <v-layout>
            <v-flex class="fixtitle">
              {{ patient.last_name }}, {{ patient.first_name }}
            </v-flex>
          </v-layout>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-tabs
          v-model="studies.tab"
          background-color="transparent"
          grow
          @change="selectTab">
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="studies.tab">
          <v-tab-item>
            <v-container fluid grid-list-sm>
              <v-layout class="grid" wrap>
                <v-flex lg12>
                  <v-icon>crop_landscape</v-icon>
                  DNI:
                  {{ patient.dni }}
                </v-flex>
                <v-flex lg12>
                  <v-icon>person</v-icon>
                  Nombre completo:
                  {{ patient.first_name }} {{ patient.last_name }}
                </v-flex>
                <v-flex lg3>
                  <v-icon>calendar_today</v-icon>
                  Fecha de Nacimiento:
                  {{ patient.birth_date }}
                </v-flex>
                <v-flex lg4>
                  Edad:
                  {{ patient.age }}
                </v-flex>
                <v-flex lg12>
                  <v-icon>wc</v-icon>
                  Sexo:
                  {{ patient.gender }}
                </v-flex>
                <v-flex lg4 v-if="patient.contact">
                  <v-icon>phone</v-icon>
                  Telefono de contacto:
                  {{ patient.contact }}
                </v-flex>
                <v-flex lg4 v-if="patient.contact2">
                  <v-icon>phone</v-icon>
                  Telefono de contacto 2:
                  {{ patient.contact2 }}
                </v-flex>
                <v-flex lg3>
                  <v-icon>format_list_numbered</v-icon>
                  Numero de Historia:
                  {{ patient.history_number }}
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid grid-list-sm>
              <v-layout class="grid" wrap>
                <v-flex lg3>
                  <v-icon>hotel</v-icon>
                  Cama actual:
                </v-flex>
                <v-flex class="fix" lg4 v-if="hospitalization.bed">
                  {{ hospitalization.bed.name }}
                </v-flex>
                <v-flex class="fix" lg4 v-if="hospitalization.error">
                  No se encuentra internado en este momento
                </v-flex>
                <v-flex lg12>
                  <v-icon>healing</v-icon>
                  Diagnostico inicial:
                  {{ patient.income_diagnosis }}
                </v-flex>
                <v-flex lg12>
                  <v-row>
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
                    three-line
                    v-if="progress.progress !== null && progress.progress[0].diagnosis !== null"
                  >
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
                              </v-flex>
                            </v-layout>
                            <v-list-item-subtitle>{{ progress.description }}</v-list-item-subtitle>
                            <v-list-item-subtitle> {{ progress.status }}</v-list-item-subtitle>
                            <v-divider></v-divider>
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                  </v-list>
                  <v-flex v-if="progress.progress">No hay progresos registrados</v-flex>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid grid-list-sm>
              <v-layout wrap>
                <v-flex xs 12>
                  <v-expansion-panels multiple>
                    <v-expansion-panel>
                      <v-expansion-panel-header expand-icon="keyboard_arrow_down">Imagenes</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-card>
                          <v-card-text>
                            <v-layout>
                            <v-spacer/>
                              <v-file-input chips multiple 
                              clear-icon="clear" 
                              v-model="files" 
                              :rules="[value => value.length >= 1 || 'No se han seleccionado imagenes.']"
                              label="Seleccionar imagen"/>
                              <v-btn xs12 fab dark color="indigo" @click="agregar">
                                <v-icon dark>add_photo_alternate</v-icon>
                              </v-btn>
                               <v-snackbar
                                  v-model="snackbar"
                                  color="error"
                                  :right="true"
                                  :timeout="timeout">
                                  {{ error }}
                                  <v-btn
                                    dark
                                    text
                                    @click="snackbar = false">
                                    Cerrar
                                  </v-btn>
                                </v-snackbar>
                            </v-layout>
                            <v-layout wrap>
                            <v-flex xs3 class="ig"
                              v-for="study in studies.studies"
                              :key="study.id">
                              <a :href="study.image">
                                <v-img
                                  :src="study.image"
                                  aspect-ratio="1"/>
                              </a>
                            </v-flex>
                            </v-layout>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Patients',
  data() {
    return {
      files: [],
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      snackbar: false,
      timeout: 8000,
      error: null,
      dni: this.$route.params.id,
      tab: null,
      items: [
        'Datos Personales',
        'Diagnosticos',
        'Estudios Complementarios'
      ],
      progressForm: {
        diagnosis: null,
        description: null,
        status: null,
        has_left: false
      },
      errorStatus: null,
      errorDiagnosis: null
    }
  },
  computed: {
    ...mapState(['studies','progress','hospitalization', 'patient', 'user'])
  },
  mounted() {
    let token = this.user.token
    let dni = this.dni
    let progress = this.progress
    this.$store.dispatch('patient/obtainPatient', { token, dni })
    this.getHospitalization()
  },
  methods: {
    getHospitalization() {
      let dni = this.dni
      let token = this.user.token
      this.$store.dispatch('hospitalization/obtainHospitalizationPatient', { token, dni })
    },
    selectTab(){
      let tab = this.tab;
      this.$store.commit('studies/setIndexTab', tab)
    },
    agregar() {
      let token = this.user.token
      let dni = this.dni
      let files = this.files
      this.$store
        .dispatch('studies/createComplementaryStudy', { token, dni, files })
        .then(() => { this.$router.go() })
        .catch(err => {
        if (err !== undefined) {
          this.error = err
          this.snackbar = true
        }
        });   
    },
    saveProgress() {
      let token = this.user.token
      let progress = this.progressForm
      let dni = this.dni
      this.$store
        .dispatch('progress/createProgress', { token, dni, progress })
        .then(() => {this.$router.go() })
        .catch(err => {
          this.errorDiagnosis = err["diagnosis"]
          this.errorStatus = err["status"]
        })
    },
    
}}
</script>

<style>
.ig{
  padding:10px !important;
}
.grid{
  grid-row-gap: 20px;
}
.cardDetailview {
  border-radius: 10px;
}
.fixtitle{
  margin-left: 10px;
}
.fix{
  margin-left: -184px;
}
</style>
