<template>
  <div id="register">
    <v-app id="inspire">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registro de Usuario</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" @submit.prevent="submit">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.first_name"
                          prepend-icon="person"
                          id="first_name"
                          :error-messages="error['first_name']"
                          label="Nombre"
                          type="text"/>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.last_name"
                          id="last_name"
                          :error-messages="error['last_name']"
                          label="Apellido"
                          type="text"/>
                      </v-flex>
                      <v-flex md12>
                        <v-text-field
                          v-model="user.email"
                          prepend-icon="alternate_email"
                          id="email"
                          :error-messages="error['email']"
                          label="Email"
                          type="email"/>
                      </v-flex>
                      <v-flex md12>
                        <v-select
                          v-model="user.hierarchy"
                          :items="hierarchyItems"
                          id="hierarchy"
                          append-icon="keyboard_arrow_down"
                          prepend-icon="how_to_reg"
                          label="Jerarquia">
                        </v-select>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.password"
                          prepend-icon="lock"
                          id="password"
                          label="Contraseña"
                          :error-messages="error['password']"
                          type="password"/>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.password_confirm"
                          id="password_confirm"
                          label="Confirmar contraseña"
                          :error-messages="error['password_confirm']"
                          type="password"/>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      :to="{name: 'login'}"
                      id="btn_cancel"
                      color="primary"
                      text>
                      Cancelar
                    </v-btn>
                    <v-btn
                      id="btn_register"
                      color="primary"
                      type="submit">
                      Registrarse
                    </v-btn>
                    <v-snackbar
                      v-model="snackbar"
                      color="error"
                      :right="true"
                      :timeout="timeout">
                      Las contraseñas no coinciden
                      <v-btn
                        dark
                        text
                        @click="snackbar = false">
                        Cerrar
                      </v-btn>
                    </v-snackbar>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user: {
        email: null,
        first_name: null,
        last_name: null,
        hierarchy: null,
        password: null,
        password_confirm: null,
      },
      error: {
        email: null,
        first_name: null,
        last_name: null,
        hierarchy: null,
        password: null,
        password_confirm: null,
      },
      hierarchyItems: [
        { text: 'Jefe del servicio medico', value: 0 },
        { text: 'Medico', value: 1 },
        { text: 'Medico 2', value: 2 },
      ],
      snackbar: null,
      timeout: 6000,
    }
  },
  methods: {
    submit() {
      this.$store
        .dispatch('user/createUser', this.user)
        .then(() => this.$router.push({ name: 'login' }))
        .catch(err => {
          this.error['first_name'] = err['first_name']
          this.error['last_name'] = err['last_name']
          this.error['email'] = err['email']
          this.error['password'] = err['password']
          this.error['password_confirm'] = err['password_confirm']
          this.user['password'] = null
          this.user['password_confirm'] = null
          if (err['non_field_errors'] !== undefined) {
            this.error = err['non_field_errors'][0]
            this.snackbar = true
          }
        })
    }
  }
}
</script>
