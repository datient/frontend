<template>
  <div id="home">
    <h2>Home</h2>
    <div v-for="room in rooms" :key="room.id">
      {{ room.name }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      rooms: this.$store.state.rooms.rooms,
    }
  },
  computed: {
    ...mapState(['rooms/rooms', 'user/token'])
  },
  mounted() {
    let token = this.$store.state.user.token
    if (this.rooms === null) {
      this.$store.dispatch('rooms/obtainRooms', token)
    }
  },
}
</script>
