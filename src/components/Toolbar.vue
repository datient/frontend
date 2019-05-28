<template>
  <div id="toolbar">
    <v-toolbar color="primary">
      <v-toolbar-title>
        <router-link
          :to="{name: 'home'}"
          tag="button">
          Datient
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu transition="slide-x-transition">
          <template v-slot:activator="{ on }">
            <v-btn dark flat v-on="on">
              Username
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
export default {
  name: 'Toolbar',
  data() {
    return {
      items: [
        { title: 'Cerrar sesión' },
      ]
    }
  },
  methods: {
    logOut() {
      this.$router.push({ name: 'login' })
    }
  },
}
</script>


<style>
.v-toolbar__title {
  color: white;
}
</style>
