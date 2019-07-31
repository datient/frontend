<template>
  <div id="toolbar">
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer">
      <v-list>
        <v-list-tile
          v-for="(item, index) in drawerItems"
          :key="index">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link :to="{ 'name': 'patients' }">
                <v-toolbar-title>
                  <v-list>
     
                 {{ item.title }}
                  </v-list>
                </v-toolbar-title>  
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title>
        <router-link :to="{ name: 'home'}"> 
          <v-btn flat dark large
            color="" 
            class="btnDatient"
          >
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
<style>
#toolbar{
  background-color: #52894c;
}
</style>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Toolbar',
  data() {
    return {
      drawer: null,
      drawerItems: [
        { title: 'Pacientes', icon: 'person' },
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
    logOut() {
      this.$store.dispatch('user/logOut')
      this.$router.push({ name: 'login' })
    },
  },
}


</script>
