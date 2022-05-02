<template>
  <div>
    <Toolbar class="toolbar-style">
      <template #start>
        <h1>Sistema de Registro de Facturas de Compra</h1>
      </template>

      <template #end>
        <Button
          v-if="principal"
          label="Crear Factura"
          icon="pi pi-fw pi-pencil"
          class="p-button-success mr-2"
          @click="create()"
        />
        <Button
          v-else
          label="Página Principal"
          icon="pi pi-fw pi-home"
          class="p-button-info mr-2"
          @click="index()"
        />
        <Button
          label="Cerrar Sesión"
          icon="pi pi-fw pi-power-off"
          class="p-button-danger"
          @click="logout()"
        />
      </template>
    </Toolbar>
  </div>
</template>
<script lang="js">
import Toolbar from 'primevue/toolbar';
import Button from "primevue/button"; // Import the PrimeVue buttons.
import "primeflex/primeflex.css"; // Import the PrimeVue layout utility library.
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "BillsView",
  components: {
    Toolbar,
    Button,
  },
   props: {
    /**
     * Tipo de vista
     */
    principal: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    const data = []
    return {
      data,
    };
  },
  methods:{
    create: function() {
      this.$router.push({
        name: "CreateBill",
        replace: true,
      });
    },
    index: function() {
      this.$router.push({
        name: "BillsList",
        replace: true,
      });
    },
    logout: function() {
        const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
        axios.post(url + "logout",{},{
            headers: {
            Authorization: "Bearer " + this.$store.state.authenticationChecker.token
            }
            }).then((response) => {
          //Guardar token y estado logueado en Vuex
          if(response.data === "success"){
            this.$store.commit("authenticationChecker/reset");
            this.$router.push({
                name: "LoginPage",
                replace: true,
            });
          }
      });
    },
  }
});
</script>
<style lang="scss">
.toolbar-style {
  width: 95vw;
  margin: 0;
}
</style>
