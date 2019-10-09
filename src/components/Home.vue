<template>
  <div id="home">
    <v-card class="cardSalas">
      <v-card-title>
        <v-toolbar-title>Salas</v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <v-expansion-panels focusable>
          <v-expansion-panel
            v-for="(room, index) in rooms.rooms"
            :id="'btn_room_'+room.id"
            :key="index">
            <v-expansion-panel-header expand-icon="keyboard_arrow_down">
              <v-flex lg4> {{ room.name }} </v-flex>
              <v-flex lg4 v-if="room.is_available">
                <v-icon color="#4caf50">check_circle</v-icon>
                Camas disponibles
              </v-flex>  
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list v-for="(bed, i) in room.beds" :key="i">
                <v-btn
                  color="primary"
                  text
                  :id="'btn_bed_'+bed.id"
                  :to="{ name: 'bed', params: { id: bed.id } }">
                  {{ bed.name }}
                </v-btn>
                <v-icon color="#4caf50" v-if="bed.is_available">check_circle</v-icon>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
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
    this.$store.dispatch('rooms/obtainRooms', token)
      .then(data => this.$store.dispatch('rooms/haveBedAvailable', data))
    this.$store.dispatch('patient/obtainPatients', token)
  },
}
</script>

<style>
.cardSalas {
  border-radius: 10px;
}
</style>
