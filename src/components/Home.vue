<template>
  <div id="home">
    <h1>Salas</h1>
    <div v-for="room in rooms.rooms" :key="room.id">
      <v-btn
        color="info"
        :to="{name: 'room', params: {id: room.id}}">
        {{ room.name }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['rooms', 'user'])
  },
  mounted() {
    let token = this.user.token
    if (this.rooms.rooms === null) {
      this.$store.dispatch('rooms/obtainRooms', token)
    }
  },
}
</script>
