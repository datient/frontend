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
                width="600">
                <template v-slot:activator="{ on }">
                  <v-btn fab color="primary" v-on="on">
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Agregar paciente a la cama</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-select
                        v-model="select"
                        :items="items"
                        label="Seleccione un paciente para asignar a la cama"/>
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
        <h1>Datos Personales</h1>
        DNI: {{ patient.dni }}<br>
        Nombre completo: {{ patient.first_name }} {{ patient.last_name }}<br>
        Fecha de nacimiento: {{ patient.birth_date }}<br>
        Edad: {{ patient.age }}<br>
        Género: {{ patient.gender }}<br>
        Número de historia: {{ patient.history_number }}<br>
        Fecha de ingreso: {{ hospitalization.entry_at }}
        Días internado: {{ hospitalization.boarding_days }}<br>
        Diagnóstico de ingreso: {{ patient.income_diagnosis }}<br>
        Teléfono de contacto 1: {{ patient.contact }}<br>
        Teléfono de contacto 2: {{ patient.contact2 }}<br>
        <div v-if="progress.progress !== null">
          <h1>Último Progreso</h1>
          <h2>{{ progress.progress[0].diagnosis }}: {{ progress.progress[0].status }}</h2>
          {{ progress.progress[0].description }}<br>
        </div>
        <v-dialog v-model="dischargeDialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">Dar de alta</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Dar de alta</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field v-model="dischargeForm.diagnosis" label="Diagnóstico de egreso"/>
                <v-text-field v-model="dischargeForm.description" label="Descripción"/>
                <v-select
                  v-model="dischargeForm.status"
                  label="Estado"
                  :items="[{ text: 'Bien', value: 0 }, { text: 'Precaución', value: 1 }, { text: 'Peligro', value: 2 }]"/>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="primary" text @click="dischargeDialog = false">Cancelar</v-btn>
              <v-btn color="primary" text @click="dischargePatient">Enviar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      dischargeForm: {
        diagnosis: null,
        description: null,
        status: null,
        has_left: true
      },
      select: null,
      items: [],
    }
  },
  computed: {
    ...mapState(['hospitalization', 'patient', 'progress', 'user'])
  },
  mounted() {
    let bedId = this.bedId
    let token = this.user.token
    this.$store.dispatch('hospitalization/obtainHospitalization', { token, bedId })
    this.createSelect()
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
    createSelect() {
      Array.prototype.forEach.call(this.patient.patients, patient => {
        this.items.push({
          text: `${patient.dni} - ${patient.last_name}, ${patient.first_name}`,
          value: patient
        })
      })
    },
    dischargePatient() {
      let token = this.user.token
      let progress = this.dischargeForm
      let dni = this.patient.dni
      let bedId = this.bedId
      let doctorId = this.user.id
      this.$store.dispatch('progress/createProgress', {
        token,
        dni,
        progress
      })
      .then(() => {
        this.$store.dispatch('patient/dischargePatient', {
          token,
          bedId,
          doctorId,
          dni
        })
        .then(() => {
          this.$router.go()
        })
      })
    },
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
.bed-text h1{
  margin: 1rem 0 1rem 0;
}
</style>
