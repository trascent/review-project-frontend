<template>
  <div class="surface-card m-5 p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img
        src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_352/https://web.mejoraysoluciones.com/wp-content/uploads/2021/05/cropped-logo_blackmejoras-352x101.png"
        alt="Image"
        height="50"
        class="mb-3"
      />
      <div class="text-900 text-3xl font-medium mb-3">Bienvenido</div>
      <Message severity="error" v-if="errors.error"> Usuario inválido: {{errors.error}}</Message>
      <Message severity="error" v-if="message"> {{ message }}</Message>
    </div>

    <div>
      <label for="email1" class="block text-900 font-medium mb-2">Email</label>
      <InputText
        id="email1"
        v-model="form.email"
        type="text"
        class="w-full mb-3"
      />

      <label for="password1" class="block text-900 font-medium mb-2"
        >Password</label
      >
      <InputText
        id="password1"
        type="password"
        v-model="form.password"
        class="w-full mb-3"
      />

      <Button
        label="Iniciar Sesión"
        icon="pi pi-user"
        class="w-full"
        @click="signUp()"
      ></Button>
    </div>
  </div>
</template>
<script lang="js">
import { defineComponent } from "vue";
import "primeflex/primeflex.css";
import InputText from 'primevue/inputtext';
import Button from "primevue/button"; // Import the PrimeVue buttons.
import "primeflex/primeflex.css"; // Import the PrimeVue layout utility library.
import axios from "axios";
import Message from 'primevue/message';
export default defineComponent({
  name: "LoginPage",
  components: {
    InputText,
    Button,
    Message,
  },
  props: {
    /**
     * Mensaje de deslogueo sin autenticación
     */
    message: {
      type: String,
      default: null,
    },
  },
  data() {
    const form = {};
    return {
      form,
      errors: {},
    };
  },
  methods:{
    signUp : function(){
        const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
        axios.post(url + "login", this.form).then((response) => {
          //Guardar token y estado logueado en Vuex
          this.$store.commit("authenticationChecker/setToken", response.data.access_token);
          this.$store.commit("authenticationChecker/setAuthenticationState", true);
          this.$router.push({
            name: "BillsList",
            replace: true,
          });
      }, (error) => {
        this.errors = error.response.data
      });
    }
  },
});
</script>
