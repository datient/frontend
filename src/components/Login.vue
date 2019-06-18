<template>
  <div id="app">
    <v-app id="inspire">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form @submit.prevent="submit">
                  <v-text-field
                    v-model="email"
                    prepend-icon="person"
                    label="Email"
                    type="email"/>
                  <v-text-field
                    v-model="password"
                    prepend-icon="lock"
                    label="Password"
                    type="password"
                  />
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Ingresar</v-btn>
                  </v-card-actions>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-snackbar
          v-model="snackbar"
          :right="true"
          :timeout="timeout">
          {{ error }}
          <v-btn
            color="pink"
            flat
            @click="snackbar = false">
            Close
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
      error: null
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
      .then(res => {
        this.$router.push({ name: 'home' })
      })
      .catch(err => {
        if (err !== undefined) {
          this.error = err
          this.snackbar = true
        }
      })
    }
  }
}
</script>
