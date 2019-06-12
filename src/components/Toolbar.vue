<template>
  <div id="toolbar">
    <v-toolbar color="primary">
      <v-toolbar-title>
        <v-btn
          dark flat large
          :to="{ name: 'home' }">
          Datient
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu transition="slide-x-transition">
          <template v-slot:activator="{ on }">
            <v-btn dark flat v-on="on">
              {{ user.email }}
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in items"
              :key="index"
              @click="logOut()">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Toolbar',
  data() {
    return {
      items: [
        { title: 'Cerrar sesión' },
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logOut() {
      this.$store.dispatch('user/logOut')
      this.$router.push({ name: 'login' })
    },
  },
}
</script>


<style>
.v-toolbar__title {
  color: white;
}
</style>
