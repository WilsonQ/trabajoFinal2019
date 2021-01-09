<template>
  <b-container>
    <b-container>
      <h1 align="left">Nueva Publicacion</h1>
      <Publicacion />
    </b-container>
  </b-container>
</template>

<script>
import Publicacion from "@/components/MeliPublicacion/CrearPublicacionMeli.vue";
export default {
  name: "AltaOrdenTrabajoView",
  components: {
    Publicacion
  }
};
</script>

<style>
</style>