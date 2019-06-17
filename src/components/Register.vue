<template>
  <div id="register">
    <v-app id="inspire">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form @submit.prevent="submit">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.first_name"
                          prepend-icon="person"
                          label="Nombre"
                          type="text"/>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.last_name"
                          label="Apellido"
                          type="text"/>
                      </v-flex>
                      <v-flex md12>
                        <v-text-field
                          v-model="user.email"
                          prepend-icon="alternate_email"
                          label="Email"
                          type="email"/>
                      </v-flex>
                      <v-flex md12>
                        <v-select
                          v-model="user.hierarchy"
                          :items="['Jefe', 'Medico', 'Medico']"
                          prepend-icon="how_to_reg"
                          label="Jerarquia">
                        </v-select>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.password"
                          prepend-icon="lock"
                          label="Password"
                          type="password"/>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field
                          v-model="user.password_confirm"
                          label="Confirmar password"
                          type="password"/>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Submit</v-btn>
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
    }
  },
  methods: {
    submit() {
      this.$store
        .dispatch('user/createUser', this.user)
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>
