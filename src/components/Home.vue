<template>
  <div id="home">
    <v-card round class="cardSalas">
      <v-toolbar class="toolbarSalas">
          <v-toolbar-title class="titleSalas">Salas</v-toolbar-title>
          <v-spacer></v-spacer>
      </v-toolbar>
      <v-expansion-panel popout focusable>
        <v-expansion-panel-content
          v-for="(room, index) in rooms.rooms"
          :key="index">
          <template v-slot:header>  
              <div>
                <h3>{{ room.name }}</h3>
              </div>
          </template>
          <v-card>
            <v-card-text v-for="(bed, i) in room.beds" :key="i">
              <v-btn
                color="primary"
                flat
                :to="{ name: 'bed', params: { id: bed.id } }">
                {{ bed.name }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
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
  },
}
</script>

<style>
h1 {
  text-align: center;
}
.titleSalas {
  color: black;
}
.toolbarSalas {
    display: flex;
}
.cardSalas {
  color: white;
  border-radius: 10px;
}

</style>
