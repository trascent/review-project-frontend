<template>
  <div>
    <Card>
      <template #title v-if="mode !== 'show'">
        Creación y edición de Facturas
      </template>
      <template #title v-else> Descripción de la factura: </template>
      <template #content>
        <h2>Información General</h2>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="number">Número Factura: </label>
              <InputText
                id="number"
                placeholder="Número de Factura"
                v-model="billData.number"
                :disabled="readOnly"
              />
              <Message severity="error" v-if="errors.number">{{
                errors.number
              }}</Message>
            </div>
          </div>
        </div>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="emisor_name">Nombre Emisor: </label>
              <InputText
                placeholder="Nombre de Emisor"
                v-model="billData.emisor_name"
                :disabled="readOnly"
              />
              <Message severity="error" v-if="errors.emisor_name">{{
                errors.emisor_name
              }}</Message>
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="emisor_nit">Nit Emisor: </label>
              <InputText
                placeholder="Nit del Emisor"
                v-model="billData.emisor_nit"
                :disabled="readOnly"
              />
              <Message severity="error" v-if="errors.emisor_nit">{{
                errors.emisor_nit
              }}</Message>
            </div>
          </div>
        </div>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="buyer_name">Nombre comprador: </label>
              <InputText
                placeholder="Nombre del Comprador"
                v-model="billData.buyer_name"
                :disabled="readOnly"
              />
              <Message severity="error" v-if="errors.buyer_name">{{
                errors.buyer_name
              }}</Message>
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="buyer_nit">Nit comprador: </label>
              <InputText
                placeholder="Nit del Comprador"
                v-model="billData.buyer_nit"
                :disabled="readOnly"
              />
              <Message severity="error" v-if="errors.buyer_nit">{{
                errors.buyer_nit
              }}</Message>
            </div>
          </div>
        </div>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6" v-if="mode === 'show'">
            <div class="field">
              <label for="net_amount">Valor Sin IVA: </label>
              <span class="p-inputgroup-addon">$</span>
              <InputText
                placeholder="Valor sin IVA"
                v-model="billData.net_amount"
                :disabled="readOnly"
              />
              <Message severity="error" v-if="errors.net_amount">{{
                errors.net_amount
              }}</Message>
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="field">
              <label for="iva">IVA: </label>
              <span class="p-inputgroup-addon">%</span>
              <InputText
                placeholder="IVA"
                v-model="billData.iva"
                :disabled="readOnly"
              />
            </div>
            <Message severity="error" v-if="errors.iva">{{
              errors.iva
            }}</Message>
          </div>
        </div>
        <div class="grid p-fluid">
          <div class="col-12 md:col-6" v-if="mode === 'show'">
            <div class="field">
              <label for="total_net_amount">Valor Total: </label>
              <span class="p-inputgroup-addon">$</span>
              <InputText
                placeholder="Valor Total"
                v-model="billData.total_net_amount"
                :disabled="readOnly"
              />
            </div>
          </div>
        </div>
        <div v-if="mode !== 'create'">
          <h2>Productos Registrados:</h2>
          <div
            v-for="(content, i) in billData.product_purchases"
            :key="i"
            class="grid p-fluid"
          >
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="reg_product">Producto: </label>
                <InputText
                  placeholder="Nombre Producto"
                  v-model="content.product.name"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="unit_price">Valor Producto: </label>
                <span class="p-inputgroup-addon">$</span>
                <InputText
                  placeholder="Valor del Producto"
                  v-model="content.product.unit_price"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="reg_quantity">Cantidad: </label>
                <InputText
                  placeholder="Cantidad"
                  v-model="content.quantity"
                  :disabled="true"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-if="!readOnly">
          <h2>Agregar Productos:</h2>
          <div
            v-for="(content, i) in billData.productsList"
            :key="i"
            class="grid p-fluid"
          >
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="product_name">Producto: </label>
                <InputText
                  placeholder="Nombre Producto"
                  v-model="content.name"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="unit_price">Valor Producto: </label>
                <span class="p-inputgroup-addon">$</span>
                <InputText
                  placeholder="Valor del Producto"
                  v-model="content.unit_price"
                  :disabled="true"
                />
              </div>
            </div>
            <div class="col-12 md:col-4">
              <div class="field">
                <label for="quantity">Cantidad: </label>
                <InputText placeholder="Cantidad" v-model="content.quantity"/>
                <Message
                  severity="error"
                  v-if="errors['productsList.' + i + '.quantity']"
                  >{{ errors["productsList." + i + ".quantity"] }}</Message
                >
                <Message
                  severity="error"
                  v-if="errors.productsList"
                  >{{ errors.productsList }}</Message
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<script lang="js">
import { defineComponent } from "vue";
import Card from 'primevue/card';
import "primeflex/primeflex.css";
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
export default defineComponent({
  name: "BillForm",
  components: {
    Card,
    InputText,
    Message,
  },
  model: {
    prop: "billData",
    event: "change",
  },
  props: {
    /**
     * Errores mostrados en el formulario
     */
    errors: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * Activa el modo de solo lectura para evitar la edición de datos
     */
    readOnly: {
      type: Boolean,
      default: false,
    },
    /**
     * Activa el modo de edición de datos para según método
     */
    mode: {
      type: String,
      default: "create",
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
  created(){
  },
  methods: {
  },
});
</script>
<style lang="scss">
@import "@/assets/base.css";

.form-container {
  text-align: center;
  background: black;
}
</style>
