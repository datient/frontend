<template>
  <div id="studies">
    <v-container fluid grid-list-sm>
      <v-layout wrap>
        <v-flex xs 12>
          <v-expansion-panels multiple>
            <v-expansion-panel>
              <v-expansion-panel-header expand-icon="keyboard_arrow_down">
                Imágenes
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card elevation="0">
                  <v-card-text>
                    <v-layout>
                      <v-spacer/>
                      <v-file-input
                        v-model="files" 
                        :rules="filesRules"
                        chips
                        multiple 
                        clear-icon="clear"
                        label="Seleccionar imagen"/>
                      <v-btn
                        fab
                        dark
                        color="primary"
                        @click="createStudy">
                        <v-icon>add_photo_alternate</v-icon>
                      </v-btn>
                      <v-snackbar
                        v-model="snackbar"
                        color="error"
                        :right="true"
                        :timeout="timeout">
                        {{ error }}
                        <v-btn
                          dark
                          text
                          @click="snackbar = false">
                          Cerrar
                        </v-btn>
                      </v-snackbar>
                    </v-layout>
                    <v-layout wrap>
                    <v-flex xs3 class="ig"
                      v-for="study in studies.studies"
                      :key="study.id">
                      <a :href="study.image">
                        <v-img
                          :src="study.image"
                          aspect-ratio="1"/>
                      </a>
                    </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Studies',
  props: ['dni'],
  data() {
    return {
      files: [],
      filesRules: [value => value.length >= 1 || 'No se han seleccionado imagenes.'],
      snackbar: null,
      timeout: 6000,
      error: null,
    }
  },
  computed: {
    ...mapState(['studies']),
  },
  mounted() {
    this.$store
      .dispatch('studies/obtainStudies', { patientDni: this.dni })
      .then(res => console.log(res))
  },
  methods: {
    createStudy() {
      this.$store
        .dispatch('studies/createComplementaryStudy', {
          dni: this.dni,
          files: this.files
        })
        .then(() => this.$router.go())
        .catch(err => {
          this.error = err
          this.snackbar = true
        })
    }
  }
}
</script>

<style>
.ig {
  padding:10px !important;
}
</style>
