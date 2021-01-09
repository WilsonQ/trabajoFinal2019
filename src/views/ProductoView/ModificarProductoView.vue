<template>
  <b-container>
    <h1 align="left">Modificar Producto</h1>
    <ModificarProducto />
  </b-container>
</template>

<script>
// @ is an alias to /src
import ModificarProducto from "@/components/producto/ModificarProducto.vue";

export default {
  name: "ModificarProductoView",
  components: {
    ModificarProducto
  }
};
</script>