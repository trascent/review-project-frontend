<template>
  <div>
    <toolbar-menu :principal="false"></toolbar-menu>
    <bill-form :bill-data="form" mode="edit" :errors="errors" />
    <Button label="Volver" class="p-button-danger" @click="back()" />
    <Button
      label="Guardar Cambios"
      icon="pi pi-fw pi-pencil"
      class="p-button-success mr-2"
      @click="update()"
    />
  </div>
</template>
<script lang="js">
import { defineComponent } from "vue";
import BillForm from "../components/BillForm.vue";
import axios from "axios";
import Button from "primevue/button"; // Import the PrimeVue buttons.
import "primeflex/primeflex.css"; // Import the PrimeVue layout utility library.
import ToolbarMenu from "../components/ToolbarMenu.vue";
export default defineComponent({
  name: "EditBill",
  components: {
    BillForm,
    Button,
    ToolbarMenu
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
      errors: {},
      form: {
        productsList: [
        ]
      },
    };
  },
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
    /**
    * Obtiene los datos de la factura
    */
    const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
    // Traer datos de las facturas
    axios.get(url + "bills/"+ parseInt(this.id) + "/edit", {
      headers: {
        Authorization: "Bearer " + this.$store.state.authenticationChecker.token
      }
    }).then((response) => {
      return this.form = response.data;
    });
    // Traer datos de los productos
    axios.get(url + "products", {
      headers: {
        Authorization: "Bearer " + this.$store.state.authenticationChecker.token
      }
    }).then((response) => {
      const products = response.data;
      products.forEach(function (element) {
        element.quantity = 0;
      });
      return this.form.productsList = products;
    });
  },
  computed: {
  },
  methods: {
    back: function () {
      window.history.back();
    },
    update: function () {
      // Hacer solicitud HTTP
      const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
      axios.put(url + "bills/" + parseInt(this.id), this.form, {
      headers: {
        Authorization: "Bearer " + this.$store.state.authenticationChecker.token
      }
      }).then((response) => {
        if(response.data === "success"){
          this.$router.push({
            name: "ShowBill",
            params: {
              id: this.id,
            },
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
