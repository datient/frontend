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
              {{ room.name }}
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
    this.$store.dispatch('patient/obtainPatients', token)
  },
}
</script>

<style>
.cardSalas {
  border-radius: 10px;
}
</style>
