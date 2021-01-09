<template>
  <b-container>
    <h1 align="left">Nueva Venta</h1>
    <Formulario />
    <Tabla />
    <BottonSelect />
    <v-snackbar color="error" multi-line vertical v-model="snackbar" :timeout="timeout">
      {{this.$store.state.venta.duplicado?text2:text1 }}
      <v-btn text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations } from "vuex";
import Formulario from "@/components/venta/FormularioVenta";
import Tabla from "@/components/venta/TablaVenta";
import BottonSelect from "@/components/venta/BottonSelect";
export default {
  name: "AltaProductoView",
  data() {
    return {
      snackba: true,
      text1: "Codigo Incorrecto, No se encontro el Producto",
      text2: "Producto ya Ingresado",
      timeout: 4000
    };
  },
  methods: {
    ...mapGetters("venta", ["GET_NOTIFICACION", "GET_ITEMS"]),
    ...mapMutations("venta", ["SET_NOTIFICACION"])
  },
  computed: {
    snackbar: {
      get: function() {
        return this.GET_NOTIFICACION();
      },
      set: function(value) {
        this.SET_NOTIFICACION(value);
      }
    }
  },
  components: {
    Formulario,
    Tabla,
    BottonSelect
  },
  destroyed() {
    this.$store.commit("venta/LIMPIAR_ITEMS");
  }
};
</script>