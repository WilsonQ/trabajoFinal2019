<template>
  <b-container>
    <Title :esModificar="true" />
    <ModificarProducto :esModificar="true" />
  </b-container>
</template>

<script>
import ModificarProducto from "@/components/OrdenTrabajo/FormularioOrdenTrabajo.vue";
import Title from "@/components/OrdenTrabajo/TitleBotton.vue";

export default {
  name: "ModificarOrdenTrabajoView",
  components: {
    ModificarProducto,
    Title
  }
};
</script>

<style>
</style>