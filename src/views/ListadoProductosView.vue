<template>
  <b-container>
    <h1>Lista de Productos</h1>
    <ListadoProductos />
  </b-container>
</template>

<script>
// @ is an alias to /src
import ListadoProductos from "@/components/ListadoProductos.vue";

export default {
  name: "ListadoProductosView",
  components: {
    ListadoProductos
  }
};
</script>