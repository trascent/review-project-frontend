<template>
  <div>
    <DataTable
      :value="billsData"
      :paginator="true"
      class="p-datatable-bills"
      :rows="10"
      dataKey="id"
      :rowHover="true"
      v-model:selection="selectedCustomers"
      v-model:filters="filters"
      filterDisplay="menu"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 30]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      :globalFilterFields="[
        'name',
        'country.name',
        'representative.name',
        'status',
      ]"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="flex justify-content-center align-items-center">
          <h5 class="m-0">Facturas</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
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
        <template #body>
          <Button type="button">Editar</Button>
          <Button type="button">Mostrar</Button>
          <Button type="button">Eliminar</Button>
        </template>
      </Column>
      <Column
        field="number"
        header="Número de factura"
        sortable
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.number }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Busqueda por número de factura"
          />
        </template>
      </Column>
      <Column
        field="emisor_name"
        header="Nombre Emisor"
        sortable
        filterMatchMode="contains"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.emisor_name }}
        </template>
      </Column>
      <Column field="emisor_nit" header="Nit" sortable style="min-width: 14rem">
        <template #body="{ data }">
          {{ data.emisor_nit }}
        </template>
      </Column>
      <Column
        field="buyer_name"
        header="Nombre Comprador"
        sortable
        filterMatchMode="contains"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          {{ data.buyer_name }}
        </template>
      </Column>
      <Column field="buyer_nit" header="Nit" sortable style="min-width: 14rem">
        <template #body="{ data }">
          {{ data.buyer_nit }}
        </template>
      </Column>
      <Column
        field="net_amount"
        header="Valor sin IVA"
        sortable
        dataType="numeric"
        style="min-width: 8rem"
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
        style="min-width: 8rem"
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
      <Column
        field="productPurchases"
        header="Nombre Emisor"
        sortable
        filterMatchMode="contains"
        style="min-width: 14rem"
      >
        <template #body="{ data }">
          <ul v-for="(content, i) in data" :key="i">
            {{
              content
            }}
          </ul>
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
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import axios from "axios";
export default defineComponent({
  name: "TableForm",
  components: {
  },
  data() {
    return {
      billsData: [],
      loading: true,
    };
  },
  /**
   * Obtiene la lista de facturas
   */
  created() {
    const url = import.meta.env.VITE_VUE_APP_ENDPOINT_URL;
    axios.get(url + "bills").then((response) => {
      return this.billsData = response.data;
    });
  },
  methods: {
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

::v-deep(.p-datatable.p-datatable-customers) {
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
