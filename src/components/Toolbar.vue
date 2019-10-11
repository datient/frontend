<template>
  <div id="toolbar">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.first_name }} {{ user.last_name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list shaped>
        <v-list-item-group
          v-model="item"
          color="primary"
          mandatory>
          <v-list-item
            v-for="(item, index) in drawerItems"
            :id="item.id"
            :key="index"
            @click="changeRoute(item.route)">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon id="btn_drawer" @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">
          <v-btn text large>
            Datient
          </v-btn>
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-menu
          transition="slide-x-transition"
          bottom
          right>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">
              {{ user.email }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logOut">
              <v-list-item-title>
                Cerrar sesión
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
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
        { title: 'Estadisticas', icon: 'pie_chart', route: 'statistics', id: 'btn_statistics' },
      ],
      item: 0,
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    changeRoute(route) {
      return route !== this.$route.name
        ? this.$router.push({ name: route })
        : this.drawer = false
    },
    logOut() {
      this.$store.dispatch('user/logOut')
      this.$router.push({ name: 'login' })
    },    
  },
}
</script>
