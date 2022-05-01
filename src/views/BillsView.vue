<template>
  <table-form></table-form>
</template>
<script lang="js">
import TableForm from "../components/TableForm.vue";
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "BillsView",
  components: {
    TableForm,
  },
  data() {
    const data = []
    return {
      data,
    };
  },
});
</script>
