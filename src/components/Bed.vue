<template>
  <div id="bed">
    <h1>Bed {{ bedId }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Bed',
  data () {
    return {
      bedId: this.$route.params.id
    }
  }
}
</script>
