<template>
  <b-container>
    <h1>Eliminar Producto</h1>
    <EliminarProducto />
  </b-container>
</template>

<script>
// @ is an alias to /src
import EliminarProducto from "@/components/producto/EliminarProducto.vue";

export default {
  name: "EliminarProductoView",
  components: {
    EliminarProducto
  }
};
</script>