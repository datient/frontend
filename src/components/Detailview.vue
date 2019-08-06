<template>
  <div id="detailview">
    <v-card round class="cardDetailview">
      <v-toolbar>
        <v-toolbar-title>
          <v-layout>
            <v-flex class="fixtitle">
              {{ patient.last_name }}, {{ patient.first_name }}
            </v-flex>
          </v-layout>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-container fluid grid-list-sm>
              <v-layout class="grid" wrap>
                <v-flex lg12>
                  <v-icon>crop_landscape</v-icon>
                  DNI:
                  {{ patient.dni }}
                </v-flex>
                <v-flex lg12>
                  <v-icon>person</v-icon>
                  Nombre completo:
                  {{ patient.first_name }} {{ patient.last_name }}
                </v-flex>
                <v-flex lg3>
                  <v-icon>calendar_today</v-icon>
                  Fecha de Nacimiento:
                  {{ patient.birth_date }}
                </v-flex>
                <v-flex class="fix" lg4>
                  Edad:
                  {{ patient.age }}
                </v-flex>
                <v-flex lg12>
                  <v-icon>wc</v-icon>
                  Sexo:
                  {{ patient.gender }}
                </v-flex>
                <v-flex lg3>
                  <v-icon>format_list_numbered</v-icon>
                  Numero de Historia:
                  {{ patient.history_number }}
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid grid-list-sm>
              <v-layout class="grid" wrap>
                <v-flex lg9>
                  <v-icon>hotel</v-icon>
                  Cama actual:
                  {{ hospitalization.bedName }}
                </v-flex>
                <v-flex lg9>
                  <v-icon>healing</v-icon>
                  Diagnostico inicial:
                  {{ patient.income_diagnosis }}
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container class="grid" fluid grid-list-sm>
              <v-layout wrap>
                <v-flex xs 12>
                  <v-expansion-panel
                      v-model="panel"
                      expand
                    >
                     <v-expansion-panel-content>
                       <template v-slot:header>
                        <div>Imagenes</div>
                      </template>
                      <v-card>
                        <v-card-text>
                           <v-flex v-for="study in studies.studies" :key="study.id">
                            <v-img :src="study.image"/>
                          </v-flex>
                        </v-card-text>
                      </v-card>
                     </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "Patients",
  data() {
    return {
      dni: this.$route.params.id,
      tab: null,
      items: ["Datos Personales", "Diagnosticos", "Estudios Complementarios"]
    };
  },
  computed: {
    ...mapState(["studies","hospitalization","patient", "user"])
  },
  watch: {},
  mounted() {
    let token = this.user.token;
    let dni = this.dni;
    this.$store.dispatch("patient/obtainPatient", { token, dni });
  }
};
</script>

<style>
.grid{
  grid-row-gap: 20px;
}
.cardDetailview {
  border-radius: 10px;
}
.fixtitle{
  margin-left: 10px;
}
.fix {
  margin-top: 4.8px;
}
</style>

