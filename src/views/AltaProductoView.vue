<template>
  <b-container>
    <h1>Nuevo Producto</h1>
    <AltaProducto />
  </b-container>
</template>

<script>
// @ is an alias to /src
import AltaProducto from "@/components/AltaProducto.vue";

export default {
  name: "AltaProductoView",
  components: {
    AltaProducto
  }
};
</script>