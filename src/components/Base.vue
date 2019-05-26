<template>
  <div id="base">
    <Toolbar/>
    <h1>Base</h1>
    <router-view/>
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
