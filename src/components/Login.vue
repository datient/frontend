<template>
  <div id="app">
    <v-app id="inspire">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 cardLogin">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form @submit.prevent="submit">
                  <v-text-field
                    v-model="email"
                    prepend-icon="person"
                    id="email"
                    :error-messages="errorUsername"
                    label="Email"
                    type="email"/>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    id="password"
                    :error-messages="errorPassword"
                    label="Contraseña"
                    type="password"/>
                  <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      id="btn_register"
                      color="primary"
                      text
                      :to="{ name: 'register' }">
                      Registrarse
                    </v-btn>
                    <v-btn
                      id="btn_login"
                      class= "btnIngresar"
                      color="primary"
                      type="submit">
                      Ingresar
                    </v-btn>
                  </v-card-actions>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
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
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      snackbar: false,
      timeout: 6000,
      error: null,
      errorUsername: null,
      errorPassword: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    submit() {
      this.$store.dispatch('user/obtainToken', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push({ name: 'home' })
      })
      .catch(err => {
        this.errorUsername = err['email']
        this.errorPassword = err['password']
        if (err['non_field_errors'] !== undefined) {
          this.error = err['non_field_errors'][0]
          this.snackbar = true
        }
      })
    }
  }
}
</script>
