<template>
  <Card>
    <template #title> Creación y edición de Facturas </template>
    <template #content>
      <h5>Información General</h5>
      <div class="grid p-fluid">
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <InputText
              placeholder="Número de Factura"
              v-model="billData.number"
              :disabled="readOnly"
            />
          </div>
        </div>
      </div>
      <div class="grid p-fluid">
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <InputText
              placeholder="Nombre de Emisor"
              v-model="billData.emisor_name"
              :disabled="readOnly"
            />
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <InputText
              placeholder="Nit del Emisor"
              v-model="billData.emisor_nit"
              :disabled="readOnly"
            />
          </div>
        </div>
      </div>
      <div class="grid p-fluid">
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <InputText
              placeholder="Nombre del Comprador"
              v-model="billData.buyer_name"
              :disabled="readOnly"
            />
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <InputText
              placeholder="Nit del Comprador"
              v-model="billData.buyer_nit"
              :disabled="readOnly"
            />
          </div>
        </div>
      </div>
      <div class="grid p-fluid">
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">$</span>
            <InputText
              placeholder="Valor sin IVA"
              v-model="billData.net_amount"
              :disabled="readOnly"
            />
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">%</span>
            <InputText placeholder="IVA" v-model="billData.iva" :disabled="readOnly"/>
          </div>
        </div>
      </div>
      <h5>Productos:</h5>
      <div
        v-for="(content, i) in billData.productPurchases"
        :key="i"
        class="grid p-fluid"
      >
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <InputText placeholder="Nombre Producto" v-model="content.product.name" :disabled="readOnly"/>
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">$</span>
            <InputText
              placeholder="Valor del Producto"
              v-model="content.product.unit_price"
              :disabled="readOnly"
            />
          </div>
        </div>
        <div class="col-12 md:col-4">
          <div class="p-inputgroup">
            <InputText placeholder="Cantidad" v-model="content.quantity" :disabled="readOnly"/>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
<script lang="js">
import { defineComponent } from "vue";
import Card from 'primevue/card';
export default defineComponent({
  name: "BillForm",
  components: {
  },
  model: {
    prop: "billData",
    event: "change",
  },
  props: {
    /**
     * Activa el modo de solo lectura para evitar la edición de datos
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * Datos de la factura
     */
    billData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
    };
  },
  watch: {
    /** Monitorear el objeto para emitir el evento del v-model */
    billData: {
      deep: true,
      handler(newValue) {
        this.$emit("change", newValue);
      },
    },
  },
  /**
   * Crea el listener para detectar el cambio del size en el dispositivo
   */
  created() {
  },
  /**
   * Se realiza un re-ajuste del height de los contenedores de los códigos en el momento de renderizar el componente
   */
  mounted() {
  },
  /**
   * Antes de destruir el componente es necesario remover el listener de detección en el cambio del size y limpiar el interval para modificar el tamaño del código
   */
  beforeUnmount() {
  },
  computed: {
  },
  methods: {
  },
});
</script>
