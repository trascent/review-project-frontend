<template>
  <div>
    <Toolbar>
      <template #start>
        <h1>Sistema de Registro de Facturas de Compra</h1>
      </template>

      <template #end>
        <Button
          label="Crear Factura"
          icon="pi pi-fw pi-pencil"
          class="p-button-success mr-2"
        />
        <Button
          label="Cerrar Sesión"
          icon="pi pi-fw pi-power-off"
          class="p-button-danger"
        />
      </template>
    </Toolbar>
  </div>
  <div>
    <bills-view />
  </div>
  <RouterView />
</template>
<script lang="js">
import { RouterView } from 'vue-router'
import Toolbar from 'primevue/toolbar';
import Button from "primevue/button"; // Import the PrimeVue buttons.
import "primeflex/primeflex.css"; // Import the PrimeVue layout utility library.
import { defineComponent } from "vue";
import BillsView from "@/views/BillsView.vue";
export default defineComponent({
  name: "App",
  components: {
    RouterView,
    Toolbar,
    Button,
    BillsView,
  },
  setup() {
		return {
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/base.css";

.p-toolbar {
  width: 90vw;
  margin: 0;
}
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
