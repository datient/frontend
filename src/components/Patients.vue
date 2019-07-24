<template>
  <div id="patients">
    <v-card round class="cardPatient">
      <v-toolbar color="white" flat>
          <v-toolbar-title>Pacientes</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical/>
      <v-spacer/>
      <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on">
            Nuevo Paciente
          </v-btn>
        </template>
        <v-card>
          <v-card-title
            class="headline"
            primary-title>
            {{ title }}
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="patientForm.first_name"
                    label="Nombre"
                    prepend-icon="person"
                    type="text"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="patientForm.last_name"
                    label="Apellido"
                    type="text"/>
                </v-flex>
                <v-flex xs12 md7>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="patientForm.birth_date"
                        label="Fecha de nacimiento"
                        prepend-icon="calendar_today"
                        readonly
                        v-on="on"/>
                    </template>
                    <v-date-picker v-model="patientForm.birth_date" @input="menu = false"/>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md5>
                  <v-text-field
                    v-model="patientForm.dni"
                    label="DNI"
                    prepend-icon="crop_landscape"
                    type="number"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="patientForm.history_number"
                    label="Numero de historia"
                    prepend-icon="edit"
                    type="number"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select
                    v-model="patientForm.gender"
                    :items="['Masculino', 'Femenino']"
                    label="Genero"
                    prepend-icon="wc"/>
                </v-flex>
                <v-flex>
                  <v-textarea
                    v-model="patientForm.income_diagnosis"
                    label="Diagnostico"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class=card_actions>
            <v-spacer/>
            <v-btn
              color="primary" flat
              @click="savePatient">
               {{ submit }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>    
    </v-toolbar>
    
    <v-data-table
      hide-actions
      :headers="headers"
      :items="patient.patients">
      <template v-slot:items="props">
        <td><router-link :to="{ name: 'detailview', params: { id: props.item.dni } }"><a>{{ props.item.dni }}</a></router-link></td>
        <td>{{ props.item.last_name }}</td>
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.birth_date }}</td>
        <td>{{ props.item.age }}</td>
        <td>{{ props.item.gender === 0 ? 'Masculino' : 'Femenino' }}</td>
        <td>{{ props.item.history_number }}</td>
        <td>
          <v-icon class="mr-2" @click="editPatientDialog(props.item)">edit</v-icon>
          <v-icon @click="deletePatient(props.item.dni)">delete</v-icon>
        </td>
      </template>
    </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers';

export default {
  name: 'Patients',
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'DNI', value: 'dni' },
        { text: 'Apellido', value: 'last_name' },
        { text: 'Nombre', value: 'first_name' },
        { text: 'Fecha de nacimiento', value: 'birth_date' },
        { text: 'Edad', value: 'age' },
        { text: 'Genero', value: 'gender' },
        { text: 'N° de Historia', value: 'history_number' },
        { text: 'Acciones', value: 'dni', sortable: false },
      ],
      menu: false,
      patientForm: {
        dni: null,
        first_name: null,
        last_name: null,
        birth_date: null,
        history_number: null,
        gender: null,
        income_diagnosis: null
      },
      defaultForm: {
        dni: null,
        first_name: null,
        last_name: null,
        birth_date: null,
        history_number: null,
        gender: null,
        income_diagnosis: null
      },
      index: -1,
    }
  },
  computed: {
    ...mapState(['patient', 'user']),
    submit (){
      return this.index === -1 ? 'Agregar' : 'Editar'
    },
    title () {
      return this.index === -1 ? 'Nuevo Paciente' : 'Editar Paciente'
    },
    formButton() {
      return this.index === -1 ? 'createPatient' : 'savePatient'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted() {
    let token = this.user.token
    this.$store.dispatch('patient/obtainPatients', token)
  },
  methods: {
    createPatient() {
      let token = this.user.token
      let patient = this.patientForm
      this.$store
        .dispatch('patient/createPatient', { token, patient })
        .then(() => {
          this.$router.go()
        })
    },
    editPatientDialog(item){
      this.index = 1
      this.patientForm = Object.assign({}, item)
      this.dialog = true
    },
    editPatient() {
      let token = this.user.token
      let patient = this.patientForm
      this.$store
        .dispatch('patient/editPatient', { token, patient })
        .then(() => {
          this.$router.go()
        })
    },
    savePatient() {
      this.index === -1 ? this.createPatient() : this.editPatient()
    },
    deletePatient(dni) {
      let sure = confirm(`Estas seguro/a de que quieres eliminar al paciente ${dni}?`)
      if (sure) {
        let token = this.user.token
        this.$store
          .dispatch('patient/deletePatient', { token, dni })
          .then(() => {
            this.$router.go()
          })
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.patientForm = Object.assign({}, this.defaultForm)
        this.index = -1
      }, 300)
    },
  }
}
</script>
<style>
  .card_actions{
    margin-top: -20px;
  }
</style>

<style>
  .card_actions{
    margin-top: -25px;
  }
</style>
