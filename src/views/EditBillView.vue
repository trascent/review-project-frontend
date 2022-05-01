<template>
  <bill-form v-model="form" />
  <Card>
    <template #content>
      <Button
        label="Volver"
        icon="pi pi-fw pi-power-off"
        class="p-button-danger"
        @click="back()"
      />
      <Button
        label="Editar Factura"
        icon="pi pi-fw pi-pencil"
        class="p-button-success mr-2"
        @click="update()"
      />
    </template>
  </Card>
</template>
<script lang="js">
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "BillsList",
  components: {
  },
  props: {
    /**
     * número de la factura
     */
    number: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  /**
   * Obtiene los datos de la factura
   */
  created() {
    const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
    axios.get(url + "bills/"+ this.id + "/edit").then((response) => {
      return this.form = response.data;
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
      axios.put(url + "bills/" + this.number, this.form).then((response) => {
        return response.data;
      });
    },
  },
});
</script>
