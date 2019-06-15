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
      headers: [
        { text: 'DNI', value: 'dni' },
        { text: 'Apellido', value: 'last_name' },
        { text: 'Nombre', value: 'first_name' },
        { text: 'Fecha de nacimiento', value: 'birth_date' },
        { text: 'Edad', value: 'age' },
        { text: 'Genero', value: 'gender' },
      ]
    }
  },
  computed: {
    ...mapState(['patient', 'user'])
  },
  mounted() {
    let token = this.user.token
    this.$store.dispatch('patient/obtainPatients', token)
  }
}
</script>

