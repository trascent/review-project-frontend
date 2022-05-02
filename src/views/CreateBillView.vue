<template>
  <div>
    <toolbar-menu :principal="false"></toolbar-menu>
    <bill-form :bill-data="formData" mode="create" :errors="errors" />
    <Button label="Volver" class="p-button-danger" @click="back()" />
    <Button
      label="Crear Factura"
      icon="pi pi-fw pi-pencil"
      class="p-button-success mr-2"
      @click="save()"
    />
  </div>
</template>
<script lang="js">
import { defineComponent } from "vue";
import BillForm from "../components/BillForm.vue";
import Button from "primevue/button"; // Import the PrimeVue buttons.
import "primeflex/primeflex.css"; // Import the PrimeVue layout utility library.
import axios from "axios";
import ToolbarMenu from "../components/ToolbarMenu.vue";
export default defineComponent({
  name: "CreateBill",
  components: {
    BillForm,
    Button,
    ToolbarMenu,
  },
  data() {
    return {
      errors: {},
      // Se definen las propiedades debido a que son propiedades anidadas y son requeridas para poder renderizar el formulario
      formData: {
        productPurchases: [
        ],
        productsList: [
        ]
      },
    };
  },
  created(){
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
    // Traer datos de los producto
    axios.get(url + "products", {
      headers: {
        Authorization: "Bearer " + this.$store.state.authenticationChecker.token
      }
      }).then((response) => {
      const products = response.data;
      products.forEach(function (element) {
        element.quantity = 0;
      });
      return this.formData.productsList = products;
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
    save: function () {
      const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
      axios.post(url + "bills", this.formData, {
      headers: {
        Authorization: "Bearer " + this.$store.state.authenticationChecker.token
      }
      }).then((response) => {
        if(response.data === "success"){
          this.$router.push({
            name: "BillsList",
            replace: true,
          });
        }
      }, (error) => {
        this.errors = error.response.data
      });
    },
  },
});
</script>
