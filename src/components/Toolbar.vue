<template>
  <div id="toolbar">
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer">
      <v-toolbar class="transparent" flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              {{ user.first_name }} {{ user.last_name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider/>
      <v-list>
        <v-list-tile
          v-for="(item, index) in drawerItems"
          :key="index"
          @click="changeRoute(item.route)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            {{ item.title }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon
        id="btn_drawer"
        @click="drawer = !drawer"/>
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">
          <v-btn flat dark large>
            Datient
          </v-btn>
        </router-link>
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
              v-for="(item, index) in toolItems"
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
      drawer: null,
      drawerItems: [
        { title: 'Home', icon: 'home', route: 'home', id: 'btn_home' },
        { title: 'Pacientes', icon: 'person', route: 'patients', id: 'btn_patients' },
      ],
      toolItems: [
        { title: 'Cerrar sesión' },
      ],
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    changeRoute(route) {
      this.$router.push({ name: route })
    },
    logOut() {
      this.$store.dispatch('user/logOut')
      this.$router.push({ name: 'login' })
    },    
  },
}
</script>
