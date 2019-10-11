<template>
  <div id="statistics">
    <v-card round class="statisticsCard">
      <v-card-title class="text-center justify-center">
        <v-toolbar-title>
          Estadisticas mensuales
        </v-toolbar-title>
      </v-card-title>
      <v-card-text>
        <canvas id="statistics_chart"/>
        <h1>Cantidad total: {{ statistics.total }}</h1>
        <br>
        <ul class="reference">
          <li v-for="s in statistics['diagnosis'].length" :key="s">
            <v-avatar :color="statistics['colors'][s-1]" size="14"/>
            {{ statistics['diagnosis'][s-1] }}: {{ statistics['data'][s-1] }}
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { mapState } from 'vuex'

export default {
  name: 'Statistics',
  computed: {
    ...mapState(['statistics']),
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.commit('statistics/resetStatistics')
    this.$store
      .dispatch('statistics/retrieveStatistics')
      .then(() => { this.createChart(this.statistics) })
  },
  methods: {
    createChart(data) {
      const ctx = document.getElementById('statistics_chart')
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data['diagnosis'],
          datasets: [{
            backgroundColor: data['colors'],
            data: data['data'],
          }]
        }
      })
    },
  }
}
</script>

<style>
.reference {
  list-style-type: none;
}
.statisticsCard {
  border-radius: 10px;
}
</style>
