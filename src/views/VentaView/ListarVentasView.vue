<template>
  <div>
    <h1 align="left">Listado de Ventas</h1>

    <v-container>
      <Tabla />
    </v-container>
  </div>
</template>

<script>
import Tabla from "@/components/venta/Table.vue";
export default {
  components: {
    Tabla
  },
  data() {
    return {
      singleExpand: false
    };
  }
};
</script>

