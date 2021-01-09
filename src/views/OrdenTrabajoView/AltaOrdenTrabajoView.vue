<template>
  <b-container>
    <Title />
    <AltaProducto />
  </b-container>
</template>

<script>
import AltaProducto from "@/components/OrdenTrabajo/FormularioOrdenTrabajo.vue";
import Title from "@/components/OrdenTrabajo/TitleBotton.vue";
export default {
  name: "AltaOrdenTrabajoView",
  components: {
    AltaProducto,
    Title
  }
};
</script>

<style>
</style>