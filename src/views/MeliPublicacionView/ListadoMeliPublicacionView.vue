<template>
  <b-container>
    <b-container>
      <Tabla />
    </b-container>
  </b-container>
</template>

<script>
import Tabla from "@/components/MeliPublicacion/TablaMeliPublicaciones.vue";
export default {
  name: "AltaOrdenTrabajoView",
  components: {
    Tabla,
  }
};
</script>

<style>
</style>