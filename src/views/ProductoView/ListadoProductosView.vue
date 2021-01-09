<template>
  <b-container>
    <h1 align="left">Listado de Productos</h1>
    <ListadoProductos />
  </b-container>
</template>

<script>
// @ is an alias to /src
import ListadoProductos from "@/components/producto/ListadoProductos.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "ListadoProductosView",
  components: {
    ListadoProductos
  },
  methods: {
    ...mapActions("producto", ["buscarProductos"])
  }
};
</script>