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
                <form @submit.prevent="submit">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.first_name"
                          prepend-icon="person"
                          id="first_name"
                          :error-messages="errorFirstN"
                          label="Nombre"
                          type="text"/>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.last_name"
                          id="last_name"
                          :error-messages="errorLastN"
                          label="Apellido"
                          type="text"/>
                      </v-flex>
                      <v-flex md12>
                        <v-text-field
                          v-model="user.email"
                          prepend-icon="alternate_email"
                          id="email"
                           :error-messages="errorEmail"
                          label="Email"
                          type="email"/>
                      </v-flex>
                      <v-flex md12>
                        <v-select
                          v-model="user.hierarchy"
                          :items="['Jefe', 'Medico', 'Medico']"
                          prepend-icon="how_to_reg"
                          id="hierarchy"
                          label="Jerarquia">
                        </v-select>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.password"
                          prepend-icon="lock"
                          id="password"
                          label="Contraseña"
                           :error-messages="errorPassword"
                          type="password"/>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.password_confirm"
                          id="password_confirm"
                          label="Confirmar contraseña"
                          :error-messages="errorPasswordC"
                          type="password"/>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-card-actions>
                    <v-spacer></v-spacer>
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
                </form>
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
      snackbar: null,
      timeout: 6000,
      errorPassword: null,
      errorPasswordC: null,
      errorFirstN: null,
      errorLastN: null,
      errorEmail: null
    }
  },
  methods: {
    submit() {
      this.$store
        .dispatch('user/createUser', this.user)
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch(err => {
        this.errorFirstN = err ['first_name']
        this.errorLastN = err ['last_name']
        this.errorEmail = err['email']
        this.errorPassword = err['password']
        this.errorPasswordC = err['password_confirm']
        if (err['non_field_errors'] !== undefined) {
          this.error = err['non_field_errors'][0]
          this.snackbar = true
          this.user.password = null
          this.user.password_confirm = null
        }
      })
    }
  }
}
</script>
