<template>
  <div>
    <toolbar-menu :principal="false"></toolbar-menu>
    <bill-form :bill-data="billData" :read-only="true" mode="show" />
    <Button label="Volver" class="p-button-danger" @click="back()" />
    <Button
      label="Editar Factura"
      icon="pi pi-fw pi-pencil"
      class="p-button-success mr-2"
      @click="edit()"
    />
  </div>
</template>
<script lang="js">
import { defineComponent } from "vue";
import BillForm from "../components/BillForm.vue";
import Button from "primevue/button"; // Import the PrimeVue buttons.
import "primeflex/primeflex.css"; // Import the PrimeVue layout utility library.
import ToolbarMenu from "../components/ToolbarMenu.vue";
import axios from "axios";
export default defineComponent({
  name: "ShowBill",
  components: {
    BillForm,
    Button,
    ToolbarMenu,
  },
  props: {
    /**
     * número de la factura
     */
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      billData: {},
    };
  },
  /**
   * Obtiene los datos de la factura
   */
  created() {
    console.log(this.$store.state.authenticationChecker.authentication)
    // Verificar si está logueado
    if(!this.$store.state.authenticationChecker.authentication){
      this.$router.push({
        name: "LoginPage",
        params: {
          message: "Usuario no autorizado, por favor vuelva a entrar.",
        },
        replace: true,
      });
    }
    const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
    axios.get(url + "bills/"+ parseInt(this.id), {
      headers: {
        Authorization: "Bearer " + this.$store.state.authenticationChecker.token
      }
      }).then((response) => {
      return this.billData = response.data;
    });
  },
  computed: {
  },
  methods: {
    back: function () {
      this.$router.push({
        name: "BillsList",
        replace: true,
      });
    },
    edit: function () {
      this.$router.push({
        name: "EditBill",
        params: {
          id: this.id,
        },
        replace: true,
      });
    },
  },
});
</script>
