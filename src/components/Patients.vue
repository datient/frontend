<template>
  <div id="patients">
    <v-toolbar color="white" flat>
      <v-toolbar-title>Pacientes</v-toolbar-title>
      <v-divider class="mx-2" inset vertical />
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar paciente..."
        single-line
        hide-details/>
      <v-spacer/>
      <v-dialog v-model="dialog" width="800">
        <template v-if="user.hierarchy == 0 || user.hierarchy == 1" v-slot:activator="{ on }">
          <v-btn color="primary" id="btn_new_patient" v-on="on">
            <v-icon>person_add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline" primary-title>{{ title }}</v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-container class="form" grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="patientForm.first_name"
                        label="Nombre"
                        prepend-icon="person"
                        id="first_name"
                        :rules="[v => !!v || 'Este campo no puede estar en blanco.']"
                        type="text"/>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="patientForm.last_name"
                        label="Apellido"
                        id="last_name"
                        :rules="[v => !!v || 'Este campo no puede estar en blanco.']"
                        type="text"/>
                    </v-flex>
                    <v-flex xs12 md7>
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290">
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="patientForm.birth_date"
                            label="Fecha de nacimiento"
                            id="birth_date"
                            :rules="[v => !!v || 'Este campo no puede estar en blanco.']"
                            prepend-icon="calendar_today"
                            readonly
                            v-on="on"/>
                        </template>
                        <v-date-picker v-model="patientForm.birth_date" 
                          min="1900-01-01"
                          :max="new Date().toISOString().substr(0, 10)"
                          locale="es - AR"
                          @input="menu = false"/>
                      </v-menu>
                    </v-flex>
                    <v-flex xs12 md5>
                      <v-text-field
                        v-model="patientForm.dni"
                        label="DNI"
                        prepend-icon="crop_landscape"
                        id="dni"
                        :readonly= "dniReadonly"
                        :error-messages= "dniError"
                        type="number"/>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        v-model="patientForm.history_number"
                        label="Numero de historia"
                        prepend-icon="edit"
                        id="history_number"
                        type="number"/>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-select
                        v-model="patientForm.gender"
                        :items="['Masculino', 'Femenino']"
                        label="Genero"
                        append-icon="keyboard_arrow_down"
                        id="gender"
                        :rules="[v => !!v || 'Este campo no puede estar en blanco.']"
                        prepend-icon="wc"
                        required/>
                    </v-flex>
                    <v-flex xs6 md6>
                      <v-text-field
                      v-model="patientForm.contact"
                      label="Numero de contacto"
                      prepend-icon="phone"
                      type="number"
                      hint="Introduzca solo numeros"
                      id="contact"/>
                    </v-flex>
                    <v-flex xs6 md6>
                      <v-text-field
                      v-model="patientForm.contact2"
                      label="Numero de contacto 2"
                      type="number"
                      prepend-icon="phone"
                      hint="Introduzca solo numeros"
                      id="contact2"/>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class=card_actions>
              <v-spacer/>
              <v-btn
                color="primary"
                id="btn_cancel"
                text
                @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                id="btn_submit"
                text
                type="submit"
                @click="savePatient">
                {{ submit }}
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog> 
    </v-toolbar>
    <v-data-table
      hide-default-footer
      no-results-text="No se han encontrado pacientes"
      :headers="headers"
      :items="patient.patients"
      :search="search">
      <template v-slot:item.dni="props">
        <router-link :to="{ name: 'detailview', params: { id: props.item.dni } }">
          <a>{{ props.item.dni }}</a>
        </router-link>
      </template>
        <template v-if="user.hierarchy in [0,1]" v-slot:item.action="{ item }">
          <v-icon
            class="mr-2"
            @click="editPatientDialog(item)">
            edit
          </v-icon>
          <v-icon
            v-if="user.hierarchy == 0"
            @click="deletePatient(item.dni)">
            delete
          </v-icon>
        </template>
        <template v-else-if="user.hierarchy == 2" v-slot:item.action="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">No disponibles</span>
            </template>
            <span>Usuario con jerarquia limitada</span>
          </v-tooltip>
        </template> 
        <template v-slot:no-data>
          <v-flex class="nodata">No hay pacientes registrados</v-flex>
        </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers'

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
        { text: 'Acciones', value: 'action', sortable: false }
        
      ],
      valid: true,
      menu: false,
      patientForm: {
        dni: null,
        first_name: null,
        last_name: null,
        birth_date: null,
        history_number: null,
        gender: null
      },
      defaultForm: {
        dni: null,
        first_name: null,
        last_name: null,
        birth_date: null,
        history_number: null,
        gender: null
      },
      index: -1,
      errorDni: null,
      search: '',
    };
  },
  computed: {
    ...mapState(['patient', 'user']),
    submit() {
      return this.index === -1 ? 'Agregar' : 'Editar'
    },
    title() {
      return this.index === -1 ? 'Nuevo Paciente' : 'Editar Paciente'
    },
    formButton() {
      return this.index === -1 ? 'createPatient' : 'savePatient'
    },
    dniReadonly() {
      return this.index === 1 ? true : false  
    },
    dniError() {
      return this.index === 1 ? null : this.errorDni
    }
  },
  watch: {
    dialog(val) {
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
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('patient/createPatient', { token, patient })
          .then(() => {
            this.$router.go()
          })
      }
      this.$store
        .dispatch('patient/createPatient', { token, patient })
        .catch(err => {
          this.errorDni = err["dni"]
        })
    },
    editPatientDialog(item) {
      this.index = 1
      this.patientForm = Object.assign({}, item)
      this.dialog = true
    },
    editPatient() {
      let token = this.user.token
      let patient = this.patientForm
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('patient/editPatient', { token, patient })
          .then(() => {
            this.$router.go()
          })
      }
    },
    savePatient() {
      this.index === -1 ? this.createPatient() : this.editPatient()
    },
    deletePatient(dni) {
      let sure = confirm(
        `Estas seguro/a de que quieres eliminar al paciente ${dni}?`
      );
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
    }
  }
}
</script>
<style>
  .nodata{
    text-align: center;
  }
</style>
