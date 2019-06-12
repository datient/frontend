<template>
  <div id="bed">
    <h1>Cama {{ bedId }}</h1>
    <h3>Paciente {{ patient.dni }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Bed',
  data () {
    return {
      bedId: this.$route.params.id
    }
  },
  computed: {
    ...mapState(['patient', 'user'])
  },
  mounted() {
    let token = this.user.token
    this.$store.dispatch('patient/obtainPatient', token)
  },
}
</script>
