<template>
  <div id="detailview">
    <v-card round class="cardDetailview">
      <v-card-title class="text-center justify-center">
        <v-toolbar-title>
          {{ patient.last_name }}, {{ patient.first_name }}
        </v-toolbar-title>
      </v-card-title>
      <v-tabs
        v-model="studies.tab"
        background-color="transparent"
        grow
        @change="selectTab">
        <v-tab
          v-for="item in items"
          :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-items v-model="studies.tab">
          <v-tab-item>
            <v-container fluid grid-list-sm>
              <v-layout class="grid" wrap>
                <v-flex lg3 style="margin-right: -181px;">
                  <v-icon>hotel</v-icon>
                  Cama actual:
                </v-flex>
                <router-link v-if="hospitalization.bed"
                  :to="{ name: 'bed', params: { id: hospitalization.bed.id }}">
                  <v-flex>
                  {{ hospitalization.bed.name }}
                  </v-flex>
                </router-link>
                <v-flex lg9 v-if="hospitalization.error">
                  No se encuentra internado en este momento
                </v-flex>
                <v-flex lg12>
                  <v-icon>person</v-icon>
                  Nombre completo:
                  {{ patient.first_name }} {{ patient.last_name }}
                </v-flex>
                <v-flex lg12>
                  <v-icon>crop_landscape</v-icon>
                  DNI:
                  {{ patient.dni }}
                </v-flex>
                <v-flex lg12>
                  <v-icon>calendar_today</v-icon>
                  Fecha de Nacimiento:
                  {{ patient.birth_date }}
                  /
                  Edad: {{ patient.age }}
                </v-flex>
                <v-flex lg12>
                  <v-icon>wc</v-icon>
                  Sexo:
                  {{ patient.gender }}
                </v-flex>
                <v-flex lg4 v-if="patient.contact">
                  <v-icon>phone</v-icon>
                  Telefono de contacto:
                  {{ patient.contact }}
                </v-flex>
                <v-flex lg4 v-if="patient.contact2">
                  <v-icon>phone</v-icon>
                  Telefono de contacto 2:
                  {{ patient.contact2 }}
                </v-flex>
                <v-flex lg3>
                  <v-icon>format_list_numbered</v-icon>
                  Numero de Historia:
                  {{ patient.history_number }}
                </v-flex>
              </v-layout>
            </v-container>
            <v-flex lg12 style="margin-top:40px">
              <v-btn
                v-if="user.hierarchy in [0]"
                color="primary"
                text
                @click="openPrintView">
                Imprimir
              </v-btn>
            </v-flex>
          </v-tab-item>
          <v-tab-item>
            <Progress :dni="dni"/>
          </v-tab-item>
          <v-tab-item>
            <Studies :dni="dni"/>
          </v-tab-item>
          <v-tab-item>
            <FuturePlan :dni="dni"/>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FuturePlan from './FuturePlan'
import Progress from './Progress'
import Studies from './Studies'

export default {
  name: 'Patients',
  data() {
    return {
      bed: null,
      dni: this.$route.params.id,
      tab: null,
      items: [
        'Datos Personales',
        'Diagnosticos',
        'Estudios Complementarios',
        'Plan Futuro',
      ],
      printHref: `http://localhost:8000/pdf/${this.$route.params.id}`,
    }
  },
  components: {
    FuturePlan,
    Progress,
    Studies,
  },
  computed: {
    ...mapState(['hospitalization', 'studies', 'patient', 'user'])
  },
  mounted() {
    let token = this.user.token
    let dni = this.dni
    this.$store.dispatch('patient/obtainPatient', { token, dni })
    this.$store
      .dispatch('hospitalization/obtainHospitalizationPatient', { token, dni: this.dni })
  },
  methods: {
    selectTab() {
      let tab = this.tab;
      this.$store.commit('studies/setIndexTab', tab)
    },
    openPrintView() {
      window.open(this.printHref, '_blank');
    }
  }
}
</script>

<style>
.grid{
  grid-row-gap: 20px;
}
.cardDetailview {
  border-radius: 10px;
  height:532px !important;
}
.fixtitle{
  margin-left: 10px;
}
</style>
