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
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
}
</script>


<style>
.v-toolbar__title {
  color: white;
}
</style>
