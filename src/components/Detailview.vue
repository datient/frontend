<template>
  <div id="detailview">
    <v-card>
          <v-card-title 
            class="headline"
            primary-title>
            Paciente: 
            {{ patient.dni }}
          </v-card-title>
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
      dni: this.$route.params.id, 
    }
  },
  computed: {
    ...mapState(['patient', 'user']),
  },
  watch: {
  },
  mounted() {
    let token = this.user.token
    let dni = this.dni
    this.$store.dispatch('patient/obtainPatient', {token, dni})
  }
}
</script>