<template>
  <v-container>
    <v-row justify="center">
      <v-card border="md">
        <v-tabs fixed-tabs v-model="tab">
          <v-tab value="login">Login</v-tab>
          <v-tab value="Register">Register</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="login">
              <!-- login -->
              <v-row justify="center">
                <v-card density="compact" max-width="600px" min-width="360px" rounded>
                  <v-card-title
                    class="mt-3 purple lighten-1 text-center text-h5 white-text"
                    >Login</v-card-title
                  >

                  <v-card-text class="px-5">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row align="center" dense>
                        <v-col cols="12">
                          <v-btn
                            @click="socialLogin('google')"
                            prepend-icon="mdi-google"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="red"
                            rounded="lg"
                            block
                            >Login With Google</v-btn
                          >
                          <v-btn
                            @click="socialLogin('facebook')"
                            prepend-icon="mdi-facebook"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="blue"
                            rounded="lg"
                            block
                            >Login With Facebook</v-btn
                          >
                          <v-btn
                            @click="socialLogin('twitter')"
                            prepend-icon="mdi-twitter"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="indigo"
                            rounded="lg"
                            block
                            >Login With Twitter</v-btn
                          >
                          <v-btn
                            @click="socialLogin('github')"
                            prepend-icon="mdi-github"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="black"
                            rounded="lg"
                            block
                            >Login With GitHub</v-btn
                          >
                          <v-btn
                            @click="socialLogin('spotify')"
                            prepend-icon="mdi-spotify"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="green"
                            rounded="lg"
                            block
                            >Login With Spotify</v-btn
                          >
                          <v-btn
                            @click="socialLogin('twitch')"
                            prepend-icon="mdi-twitch"
                            size="small"
                            variant="flat"
                            class="mb-1"
                            color="purple"
                            rounded="lg"
                            block
                            >Login With Twitch</v-btn
                          >
                          <v-text-field
                            clearable
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            variant="underlined"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            clearable
                            v-model="password"
                            :rules="passwordRules"
                            :type="showHidePassLogin ? 'text' : 'password'"
                            label="Password"
                            required
                            :append-inner-icon="showHidePassLogin ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:appendInner="showHidePassLogin = !showHidePassLogin"
                            variant="underlined"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <!-- <RouterLink to="/resetPassword">Did you forget your password?</RouterLink> -->

                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="mb-4 ml-2 mr-2 white-text"
                      color="green lighten-2"
                      variant="flat"
                      rounded
                      @click="loginUser()"
                      >Iniciar Sesion</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-window-item>

            <v-window-item value="Register">
              <!-- register -->
              <v-row justify="center">
                <v-card density="compact" max-width="600px" min-width="360px" rounded>
                  <v-card-title
                    class="purple mt-3 lighten-1 text-center text-h5 white-text"
                    >Register</v-card-title
                  >
                  <v-card-text class="px-4">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-row align="center" dense>
                        <v-col cols="12">
                          <v-text-field
                            clearable
                            v-model="email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            variant="underlined"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            clearable
                            v-model="password"
                            :rules="passwordRules"
                            :type="showHidePassRegister1 ? 'text' : 'password'"
                            label="Password"
                            required
                            :append-inner-icon="showHidePassRegister1 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:appendInner="showHidePassRegister1 = !showHidePassRegister1"
                            variant="underlined"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            clearable
                            v-model="verifyPassword"
                            :rules="passwordRules"
                            :type="showHidePassRegister2 ? 'text' : 'password'"
                            label="Re-Password"
                            required
                            :append-inner-icon="showHidePassRegister2 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:appendInner="showHidePassRegister2 = !showHidePassRegister2"
                            variant="underlined"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="mb-2 ml-2 mr-2 white-text"
                      color="blue darken-3"
                      variant="flat"
                      rounded
                      @click="registrar()"
                      >Registrarse</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref, reactive, onMounted,} from 'vue'
import axios from 'axios'
const valid = ref(true)
const tab = ref(null);
const email = ref("julio.c.ud@gmail.com");
const password = ref("123123");
const verifyPassword = ref("123123");
const showHidePassLogin = ref(false);
const showHidePassRegister1 = ref(false);
const showHidePassRegister2 = ref(false);
const BASE_URL = 'https://051a-201-138-154-72.ngrok-free.app/authAPI/public/'


onMounted(() => {
  const error = getParameterByName('error')
  if(error) return
  const token = getParameterByName('token')
  const name = getParameterByName('name')
  const email = getParameterByName('email')
  const avatar = getParameterByName('avatar')
  console.log({token, name, email, avatar})
})


const getParameterByName = (name) => {
  // obtenemos el nombre del parametro limpio
  name = name.replace(/[\[\]]/g, '\\$&');
  //verificamos por regex que exita el valor
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(window.location.href);
    //si no existe retornamos null
    console.log({results})
    if (!results) return null;
    if (!results[2]) return '';
    // existe? lo retornamos el parametro
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const socialLogin = async (provider) => {
try {
  const response = await axios.post(`${BASE_URL}api/auth`, {provider})
  console.log({response})
  window.location.href = response.data.redirectUrl;
} catch (error) {
  console.log({error})
}
};
const loginUser = async () => {

console.log("login")
};

const registrar = async () => {
console.log("data register")
};

const emailRules = reactive([
  (v) => !!v || "E-mail requerido",
  (v) => /.+@.+/.test(v) || "El formato de E-Mail es incorrecto",
]);
const passwordRules = [
  (v) => !!v || "Contraseña requerida",
  (v) => v.length >= 6 || "La contraseña debe de ser mininmo de 6 caracteres",
];

</script>

<style lang="scss" scoped>

</style>
