<template>
  <div id="bed">
    <h1>Cama {{ bedId }}</h1>
    <h3>Paciente</h3>
    <h4>{{ patient.dni }}</h4>
    <h4>{{ patient.first_name }}</h4>
    <h4>{{ patient.last_name }}</h4>
    <h4>{{ patient.age }}</h4>
    <h4>{{ patient.birth_date }}</h4>
    <h4>{{ patient.gender }}</h4>
    <h4>{{ patient.income_diagnosis }}</h4>
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
