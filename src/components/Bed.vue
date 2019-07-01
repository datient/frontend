<template>
      </div>
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
      select: 'Roberto',
        items: [
          'Raul',
          'Rene',
          'Timoteo',
          'Nahuel'
        ]
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
