<template>
  <bill-form v-model="formData" />
  <Card>
    <template #content>
      <Button
        label="Volver"
        icon="pi pi-fw pi-power-off"
        class="p-button-danger"
        @click="back()"
      />
      <Button
        label="Crear Factura"
        icon="pi pi-fw pi-pencil"
        class="p-button-success mr-2"
        @click="save()"
      />
    </template>
  </Card>
</template>
<script lang="js">
import { defineComponent } from "vue";
import BillForm from "../components/BillForm.vue";
import axios from "axios";
export default defineComponent({
  name: "CreateBill",
  components: {
    BillForm,
  },
  data() {
    return {
      // Se definen las propiedades debido a que son propiedades anidadas y son requeridas para poder renderizar el formulario
      formData: {
        productPurchases: [
          product => {}
        ],
      },
    };
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
      axios.post(url + "bills", this.formData).then((response) => {
        return response.data;
      });
    },
  },
});
</script>
