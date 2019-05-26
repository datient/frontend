<template>
  <div id="base">
    <Toolbar/>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Toolbar from './Toolbar'

export default {
  name: 'Base',
  components: {
    Toolbar
  },
}
</script>
