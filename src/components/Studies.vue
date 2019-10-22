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
                        v-if="user.hierarchy in [0,1]"
                        v-model="files" 
                        :rules="filesRules"
                        chips
                        multiple 
                        clear-icon="clear"
                        label="Seleccionar imagen"/>
                      <v-btn
                        v-if="user.hierarchy in [0,1]"
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
                      <fullscreen :ref="`${study.id}`"
                        @change="fullscreenChange"
                      >
                       <div v-if="fullscreen == true">
                          <v-img
                            :src=study.image
                          />
                        </div>
                        <div v-else>
                          <v-hover>
                            <v-img
                            id="image"
                            slot-scope="{ hover }"
                              :src=study.image
                              aspect-ratio="1"
                              class="grey lighten-2"
                            >
                            <v-expand-transition>
                              <v-flex v-if="hover"
                              >
                                <v-flex class="btns">
                                     <v-icon
                                        class="mr-2"
                                        @click="toggle(study.id)"
                                        color="white"
                                        >
                                        aspect_ratio
                                      </v-icon>
                                      <v-icon
                                        v-if="user.hierarchy in [0,1]"
                                        @click="deletePhoto(study.id)"
                                        color="white"
                                        >
                                        delete
                                      </v-icon>
                                </v-flex>
                              </v-flex>
                            </v-expand-transition>
                          </v-img>
                          </v-hover>
                        </div>
                      </fullscreen>
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
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'

Vue.use(fullscreen)

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
      fullscreen: false
    }
  },
  computed: {
    ...mapState(['studies','user']),
  },
  mounted() {
    this.$store
      .dispatch('studies/obtainStudies', { patientDni: this.dni })
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
    },
    deletePhoto(id){
      this.$store
        .dispatch('studies/deletePhoto', { id })
        .then(() => this.$router.go())
    },
    toggle(id) {
      this.$refs[id][0].toggle()
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen
    }
  }
  }
</script>

<style>
.ig {
  padding:10px !important;
}
.fullscreen {
  height: 100% !important;
  width: 100% !important;
}

.btns {
  background-color: black !important;
  text-align: center !important;
}

</style>
