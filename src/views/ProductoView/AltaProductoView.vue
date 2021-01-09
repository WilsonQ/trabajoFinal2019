<template>
  <b-container>
    <h1 align="left">Nuevo Producto</h1>
    <AltaProducto />
  </b-container>
</template>

<script>
// @ is an alias to /src
import AltaProducto from "@/components/producto/AltaProducto.vue";

export default {
  name: "AltaProductoView",
  components: {
    AltaProducto
  }
};
</script>