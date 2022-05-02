<template>
  <div>
    <toolbar-menu :principal="true"></toolbar-menu>
    <table-form></table-form>
  </div>
</template>
<script lang="js">
import TableForm from "../components/TableForm.vue";
import ToolbarMenu from "../components/ToolbarMenu.vue";
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  name: "BillsView",
  components: {
    TableForm,
    ToolbarMenu
  },
  data() {
    const data = []
    return {
      data,
    };
  },
  created(){
    console.log(this.$store.state.authenticationChecker.authentication)
    console.log(this.$store.state.authenticationChecker.token)
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
  },
});
</script>
<style lang="scss">
.p-toolbar {
  width: 90vw;
  margin: 0;
}
</style>
