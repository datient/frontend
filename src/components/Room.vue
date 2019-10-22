<template>
  <div id="room">
    <h1>Sala {{ roomId }}</h1>
    <div v-for="bed in beds" :key="bed.id">
      <v-btn
        color="info">
        {{ bed.name }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Room',
  data() {
    let roomId = this.$route.params.id
    let rooms = this.$store.state.rooms.rooms
    return {
      roomId: roomId,
      beds: rooms[roomId-1].beds,
    }
  },
  computed: {
    ...mapState(['bed', 'rooms/rooms'])
  },
  mounted() {
  },
}
</script>
