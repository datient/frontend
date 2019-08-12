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
        <v-tabs
          v-model="studies.tab"
          background-color="transparent"
          grow
          @change="selectTab">
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="studies.tab">
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
          </v-tab-item>
          <v-tab-item>
            <v-container fluid grid-list-sm>
              <v-layout class="grid" wrap>
                <v-flex lg3>
                  <v-icon>hotel</v-icon>
                  Cama actual:
                </v-flex>
                <v-flex class="fix2" lg4 v-if="hospitalization.bed">
                  {{ hospitalization.bed.name }}
                </v-flex>
                <v-flex class="fix2" lg4 v-if="hospitalization.error">
                  No se encuentra internado en este momento
                </v-flex>
                <v-flex lg12>
                  <v-icon>healing</v-icon>
                  Diagnostico inicial:
                  {{ patient.income_diagnosis }}
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid grid-list-sm>
              <v-layout wrap>
                <v-flex xs 12>
                  <v-expansion-panel expand>
                     <v-expansion-panel-content>
                       <template v-slot:header>
                        <div>Imagenes</div>
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-layout>
                          <v-spacer/>
                          	<v-text-field
                              label="Seleccionar imagen"
                              @click='pickFile'
                              v-model='imageName'
                              prepend-icon='attach_file'/>
                            <input
                              type="file"
                              style="display: none"
                              ref="image"
                              accept="image/*"
                              @change="onFilePicked">
                            <v-btn xs12 fab dark color="indigo" @click="agregar">
                              <v-icon dark>create_new_folder</v-icon>
                            </v-btn>
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
import { mapState } from 'vuex'

export default {
  name: 'Patients',
  data() {
    return {
      dialog: false,
		  imageName: '',
		  imageUrl: '',
		  imageFile: '',
      dni: this.$route.params.id,
      tab: null,
      items: [
        'Datos Personales',
        'Diagnosticos',
        'Estudios Complementarios'
      ]
    }
  },
  computed: {
    ...mapState(['studies','hospitalization', 'patient', 'user'])
  },
  mounted() {
    let token = this.user.token
    let dni = this.dni
    this.$store.dispatch('patient/obtainPatient', { token, dni })
    this.getHospitalization()
  },
  methods: {
    getHospitalization() {
      let dni = this.dni
      let token = this.user.token
      this.$store.dispatch('hospitalization/obtainHospitalizationPatient', { token, dni })
    },
    selectTab(){
      let tab = this.tab;
      this.$store.commit('studies/setIndexTab', tab)
    },
    pickFile() {
      this.$refs.image.click()
    },
		onFilePicked(e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
    },
    agregar() {
      let token = this.user.token
      let dni = this.dni
      let imageName = this.imageName
      let imageUrl = this.imageUrl
      let imageFile = this.imageFile
      let image = { 
        imageName,
		    imageUrl,
        imageFile
      }
      this.$store
        .dispatch('studies/createComplementaryStudy', { token, dni, imageFile })
        .then(() => { this.$router.go() })
    }
  } 
};
</script>

<style>
.ig{
  padding:10px !important;
}
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
.fix2{
  margin-top: 4.8px;
  margin-left: -148px;
}
</style>
