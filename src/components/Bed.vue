<template>
  <div id="room">
    <v-card round class="cardBed">
      <v-toolbar>
        <v-toolbar-title>Cama {{ bedId }}</v-toolbar-title>
        <v-spacer/>
        <v-icon>person</v-icon>
        <v-toolbar-title v-if="hospitalization.doctor != null">
          {{ hospitalization.doctor.last_name }}, {{ hospitalization.doctor.first_name }}
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
                width="800">
                <template v-slot:activator="{ on }">
                  <v-btn fab color="primary" v-on="on" id="btn_add">
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Agregar paciente a la cama</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="form">
                        <v-autocomplete
                          v-model="select"
                          :items="patientItems"
                          :loading="isLoading"
                          :search-input.sync="searchInput"
                          hide-selected
                          :rules="[v => !!v || 'Este campo no puede estar en blanco.']"
                          label="Seleccione un paciente para asignar a la cama"
                          no-data-text="No se han encontrado pacientes"
                          required
                        ></v-autocomplete>
                        <v-text-field
                          v-model="form.diagnosis"
                          :rules="[v => !!v || 'Este campo no puede estar en blanco.']"
                          label="Diagnóstico de ingreso"
                          required/>
                        <v-textarea
                          v-model="form.description"
                          rows="3"
                          label="Descripción"/>
                        <v-select
                          v-model="form.status"
                          :rules="[v => [0, 1 , 2].includes(v) || 'Este campo no puede estar en blanco.']"
                          :items="statusItems"
                          label="Estado"
                          required/>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      color="primary"
                      text
                      @click="dialog = false">
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      id="btn_assign"
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
      <v-card-text fluid class="bed-text" v-if="patient.dni != null">
        <v-container>
          <v-row>
            <v-col>
              <v-container fluid grid-list-sm>
                <v-layout class="grid" wrap>
                  <v-flex lg12>
                    <v-icon>person</v-icon>
                    Nombre completo:
                    {{ patient.first_name }} {{ patient.last_name }}
                  </v-flex>
                  <v-flex lg12>
                    <v-icon>crop_landscape</v-icon>
                    DNI:
                    <router-link
                      :to="{ name: 'detailview', params: { id: patient.dni }}">
                      {{ patient.dni }}
                    </router-link>
                  </v-flex>
                  <v-flex lg8>
                    <v-icon>calendar_today</v-icon>
                    Fecha de Nacimiento:
                    {{ patient.birth_date }}
                    /
                    Edad: {{ patient.age }}
                  </v-flex>
                  <v-flex lg12>
                    <v-icon>wc</v-icon>
                    Sexo:
                    {{ patient.gender }}
                  </v-flex>
                  <v-flex lg12 v-if="patient.contact">
                    <v-icon>phone</v-icon>
                    Telefono de contacto:
                    {{ patient.contact }}
                  </v-flex>
                  <v-flex lg12 v-if="patient.contact2">
                    <v-icon>phone</v-icon>
                    Telefono de contacto 2:
                    {{ patient.contact2 }}
                  </v-flex>
                  <v-flex lg12>
                    <v-icon>format_list_numbered</v-icon>
                    Numero de Historia:
                    {{ patient.history_number }}
                  </v-flex>
                  <v-flex lg12>
                    <v-icon>calendar_today</v-icon>
                    Fecha de ingreso:
                    {{ hospitalization.entry_at }}
                  </v-flex>
                  <v-flex lg12>
                    <v-icon>format_list_numbered</v-icon>
                    Dias internado:
                    {{ hospitalization.boarding_days }}
                  </v-flex>
                </v-layout>
              </v-container>
            </v-col>
            <v-divider vertical/>
            <v-col>
              <v-flex lg12 v-if="progress.progress !== null">
                <v-card-title fluid class="diag-title">
                  Ultimo Progreso
                </v-card-title>
              </v-flex>
              <v-flex lg12 v-if="progress.progress !== null">
                <v-card-text fluid class="bed-text">
                  <v-container fluid grid-list-sm>
                    <v-layout class="grid" wrap>
                      <v-flex lg12>
                        Diagnostico: {{ progress.progress[0].diagnosis }}
                      </v-flex>
                      <v-flex lg12>
                        Descripcion: {{ progress.progress[0].description }}
                      </v-flex>
                      <v-flex lg12>
                        Estado: {{ progress.progress[0].status }}
                      </v-flex>
                    </v-layout>
                  </v-container>     
                </v-card-text>
              </v-flex>
            <v-dialog class="pa-md-2 mx-lg-auto" v-model="dischargeDialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" id="btn_discharge" color="primary">Dar de alta</v-btn>
              </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Dar de alta</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="form">
                        <v-text-field
                          v-model="form.diagnosis"
                          :rules="[v => !!v || 'Este campo no puede estar en blanco.']"
                          id="txt_diagnosis"
                          label="Diagnóstico de egreso"
                          required/>
                        <v-text-field
                          v-model="form.description"
                          id="txt_description"
                          label="Descripción"/>
                        <v-select
                          v-model="form.status"
                          :items="statusItems"
                          :rules="[v => [0, 1 , 2].includes(v) || 'Este campo no puede estar en blanco.']"
                          label="Estado"
                          required/>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" text @click="dischargeDialog = false">Cancelar</v-btn>
                    <v-btn color="primary" text id="btn_send_discharge" @click="dischargePatinent">Enviar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
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
      dischargeDialog: false,
      form: {
        diagnosis: null,
        description: null,
        status: null,
        has_left: false
      },
      searchInput: null,
      isLoading: false,
      select: null,
      patientItems: [],
      statusItems: [
        { text: 'Bien', value: 0 },
        { text: 'Precaución', value: 1 },
        { text: 'Peligro', value: 2 }
      ],
    }
  },
  computed: {
    ...mapState(['hospitalization', 'patient', 'progress', 'user'])
  },
  mounted() {
    let bedId = this.bedId
    let token = this.user.token
    this.$store.dispatch('patient/obtainPatients', token)
    .then(() => {
      this.createSelect()
    })
    this.$store.dispatch('hospitalization/obtainHospitalization', { token, bedId })
  },
  methods: {
    assignPatient() {
      if (this.$refs.form.validate()) {
        let bedId = this.bedId
        let token = this.user.token
        let doctorId = this.user.id
        let patientDni = this.select.dni
        let progress = this.form
        progress.income = true
        this.$store.dispatch('progress/createProgress', {
          token,
          patientDni,
          progress
        })
        .then(() => {
          this.$store.dispatch('hospitalization/createHospitalization', {
            token,
            bedId,
            doctorId,
            patientDni
          })
          .then(() => { this.$router.go() })
        })
      }
    },
    createSelect() {
      Array.prototype.forEach.call(this.patient.patients, patient => {
        this.patientItems.push({
          text: `${patient.dni} - ${patient.last_name}, ${patient.first_name}`,
          value: patient
        })
      })
    },
    dischargePatinent() {
      if (this.$refs.form.validate()) {
        let token = this.user.token
        let progress = this.form
        let patientDni = this.patient.dni
        let bedId = this.bedId
        let doctorId = this.user.id
        progress.has_left = true
        this.$store.dispatch('progress/createProgress', {
          token,
          patientDni,
          progress
        })
        .then(() => {
          this.$store.dispatch('patient/dischargePatient', {
            token,
            bedId,
            doctorId,
            patientDni
          })
          .then(() => { this.$router.go() })
        })
      }
    }
  },
}
</script>

<style>
.cardBed{
  color: white;
  border-radius: 10px;
}
.bed-text{
  font-size: 1rem !important;
  padding: 1rem 2rem 1rem 2rem !important;
}
.diag-title{
  font-size: large;
}
.bed-text h1{
  margin: 1rem 0 1rem 0;
}
</style>
