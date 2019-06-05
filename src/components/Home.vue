<template>
  <div id="home">
    <h1>Salas</h1>
    <v-expansion-panel popout focusable>
      <v-expansion-panel-content
        v-for="(room, index) in rooms.rooms"
        :key="index">
        <template v-slot:header>
          <div>{{ room.name }}</div>
        </template>
        <v-card>
          <v-card-text v-for="(bed, i) in room.beds" :key="i">
            {{ bed.name }}
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
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

<style>
h1 {
  text-align: center;
}
</style>
