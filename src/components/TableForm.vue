<template>
  <div>
    <Message severity="info" v-if="deleteMessage">{{ deleteMessage }}</Message>
    <DataTable
      :value="billsData"
      :paginator="true"
      class="p-datatable-bills"
      :rows="10"
      dataKey="id"
      :rowHover="true"
      v-model:filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 30]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Datos"
      :globalFilterFields="[
        'number',
        'emisor_name',
        'emisor_nit',
        'buyer_name',
        'buyer_nit',
      ]"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="flex justify-content-center align-items-center">
          <h2 class="m-0">Listado de Facturas</h2>
          <span class="p-input-icon-left m-5">
            <InputText
              v-model="filters['global'].value"
              placeholder="Busqueda Facturas"
            />
          </span>
        </div>
      </template>
      <template #empty> Facturas no registradas. </template>
      <template #loading> Cargando Facturas... </template>
      <Column
        header="Acciones:"
        headerStyle="width: 4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body="{ data }">
          <Button
            label="Editar"
            type="button"
            class="p-button-info mr-5 p-button"
            @click="edit(data.id)"
          />
          <Button
            label="Mostrar"
            type="button"
            class="p-button-secondary mr-5"
            @click="show(data.id)"
            >Mostrar</Button
          >
          <Button
            label="Eliminar"
            type="button"
            class="p-button-danger mr-5"
            @click="deleteData(data.id)"
            >Eliminar</Button
          >
        </template>
      </Column>
      <Column
        field="number"
        header="Número de factura"
        sortable
        style="min-width: 5rem"
      >
        <template #body="{ data }">
          {{ data.number }}
        </template>
      </Column>
      <Column
        field="emisor_name"
        header="Nombre Emisor"
        sortable
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          {{ data.emisor_name }}
        </template>
      </Column>
      <Column field="emisor_nit" header="Nit" sortable style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.emisor_nit }}
        </template>
      </Column>
      <Column
        field="buyer_name"
        header="Nombre Comprador"
        sortable
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          {{ data.buyer_name }}
        </template>
      </Column>
      <Column field="buyer_nit" header="Nit" sortable style="min-width: 5rem">
        <template #body="{ data }">
          {{ data.buyer_nit }}
        </template>
      </Column>
      <Column
        field="net_amount"
        header="Valor sin IVA"
        sortable
        dataType="numeric"
        style="min-width: 6rem"
      >
        <template #body="{ data }">
          {{ "$" + data.net_amount }}
        </template>
      </Column>
      <Column
        field="iva"
        header="IVA"
        sortable
        dataType="numeric"
        style="min-width: 3rem"
      >
        <template #body="{ data }">
          {{ data.iva + "%" }}
        </template>
      </Column>
      <Column
        field="total_net_amount"
        header="Valor Total"
        sortable
        dataType="numeric"
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          {{ "$" + data.total_net_amount }}
        </template>
      </Column>
      <Column
        field="bill_purchase_date"
        header="Fecha"
        sortable
        dataType="date"
        style="min-width: 8rem"
      >
        <template #body="{ data }">
          {{ data.bill_purchase_date }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script lang="js">
import { defineComponent } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
import "primeflex/primeflex.css";
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import axios from "axios";
export default defineComponent({
  name: "TableForm",
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Button,
    InputText,
    Message
  },
  data() {
    return {
      filters: {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      },
      billsData: [],
      deleteMessage: "",
      loading: true,
    };
  },
  /**
   * Obtiene la lista de facturas
   */
  created() {
    this.getBills();
  },
  methods: {
    getBills: function() {
      const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
      axios.get(url + "bills", {
        headers: {
          Authorization: "Bearer " + this.$store.state.authenticationChecker.token
        }
        }).then((response) => {
        return this.billsData = response.data;
      });
    },
    edit: function (id) {
      this.$router.push({
        name: "EditBill",
        params: {
          id: id,
        },
        replace: true,
      });
    },
    show: function (id) {
      this.$router.push({
        name: "ShowBill",
        params: {
          id: id,
        },
        replace: true,
      });
    },
    deleteData: function (id) {
      const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
      axios.delete(url + "bills/" + id, {
        headers: {
          Authorization: "Bearer " + this.$store.state.authenticationChecker.token
        }
      })
      .then((response) => {
        if(response.data === "success"){
          console.log("success");
          this.deleteMessage = "Registro eliminado satisfactoriamente";
          this.getBills();
        }
        },(error) => {
        this.deleteMessage = error.response.data
      });
    },
  },
});
</script>
<style lang="scss" scoped>
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;

  .p-progressbar-value {
    background-color: #607d8b;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}

::v-deep(.p-datatable.p-datatable-bills) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }

  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
  }

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
}
</style>
