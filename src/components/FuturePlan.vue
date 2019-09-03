<template>
  <div id="future_plan">
    <v-container fluid>
      <v-layout>
        <v-flex xs12>
          <v-card elevation="0" class="mx-auto scroll" max-width="100%" height="400">
            <v-list>
              <v-list-item v-for="plan in plan.plans" :key="plan.id">
                <v-list-item-content>
                  <v-container>
                   <v-row>
                      <v-col cols="12" sm="10" md="11">
                        <v-list-item-subtitle>{{  new Date(plan.created_at).toLocaleString() }}</v-list-item-subtitle>
                        <v-list-item-title >{{ plan.title }}</v-list-item-title>
                        <v-list-item-subtitle> {{ plan.description }}</v-list-item-subtitle>
                      </v-col>
                      <v-col cols="12" sm="10" md="1">
                        <v-icon
                          class="mr-2"
                          absolute
                          right
                          @click="editPlanDialog(plan)">
                          edit
                        </v-icon>                    
                        <v-icon
                          absolute
                          right
                          @click="deletePlan(plan.id)">
                          delete
                        </v-icon> 
                      </v-col>
                    </v-row>
                    </v-container>
                  <v-divider/>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="planDialog"
      max-width="800">
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          v-on="on">
          Crear plan futuro
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-text-field
                v-model="planForm.title"
                label="Título"
                :rules="[v => !!v || 'Este campo no puede estar en blanco.']"/>
              <v-textarea
                v-model="planForm.description"
                label="Descripción"/>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            text
            @click="planDialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="createPlan">
            {{ formButton }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers'

export default {
  name: 'FuturePlan',
  props: ['dni'],
  computed: {
    ...mapState(['plan']),
    formButton() {
      return this.index === -1 ? 'Crear' : 'Editar'
    },
    title() {
      return this.index === -1 ? 'Nuevo Plan Futuro' : 'Editar Plan Futuro'
    }
  },
  data() {
    return {
      planDialog: false,
      planForm: {
        title: null,
        description: null,
      },
      defaultForm: {
        id: null,
        title: null,
        description: null
      },
      index: -1
    }
  },
  mounted() {
    let patientDni = this.dni
    this.$store.dispatch('plan/obtainPlans', { patientDni })
  },
  watch: {
    planDialog(val) {
      val || this.closeForm()
    }
  },
  methods: {
    createPlan() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('plan/createPlan', {
            title: this.planForm.title,
            description: this.planForm.description,
            patientDni: this.dni
          })
          .then(() => this.$router.go())
      }
    },
    closeForm() {
      this.planDialog = false
      setTimeout(() => {
        this.planForm = Object.assign({}, this.defaultForm)
        this.index = -1
      }, 300)
    },
    deletePlan(planId) {
      this.$store
        .dispatch('plan/deletePlan', { planId: planId })
        .then(() => this.$router.go())
    },
    editPlanDialog(plan) {
      this.index = 1
      this.planDialog = true
      this.planForm = Object.assign({}, plan)
    },
    editPlan(planId) {
      this.$store
        .dispatch('plan/editPlan', { planId })
        .then(() => this.$router.go())
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll {
  overflow-y: auto;
}
</style>
