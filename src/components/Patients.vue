<template>
  <div id="patients">
    <h1>Pacientes</h1>
    <v-data-table
      hide-actions
      :headers="headers"
      :items="patient.patients">
      <template v-slot:items="props">
        <td>{{ props.item.dni }}</td>
        <td>{{ props.item.last_name }}</td>
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.birth_date }}</td>
        <td>{{ props.item.age }}</td>
        <td>{{ props.item.gender }}</td>
        <td>
          <v-dialog width="500" v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">delete</v-icon>
            </template>
            <v-card>
              <v-card-title
                class="headline"
                primary-title>
                Eliminar paciente
              </v-card-title>
              <v-card-text>
                Esta seguro/a que desea eliminar al paciente {{ props.item.dni }}?
              </v-card-text>
              <v-divider/>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                  color="primary" flat
                  @click="deletePatient(props.item.dni)">
                  Si
                </v-btn>
                <v-btn
                  color="primary" flat
                  @click="dialog = false">
                  No
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
        { text: 'Acciones', value: 'dni' },
      ]
    }
  },
  computed: {
    ...mapState(['patient', 'user'])
  },
  mounted() {
    let token = this.user.token
    this.$store.dispatch('patient/obtainPatients', token)
  },
  methods: {
    deletePatient(dni) {
      let token = this.user.token
      this.$store
        .dispatch('patient/deletePatient', { token, dni })
        .then(() => {
          this.$router.go()
        })
    },
  }
}
</script>

