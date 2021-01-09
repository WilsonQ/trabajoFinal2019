<template>
  <v-card>
    <v-card-title>
      Ventas
      <div class="flex-grow-1"></div>
      <v-text-field v-model="search" append-icon="search" label="Buscar Venta" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      dense
      :headers="headers"
      :items="GET_VENTAS()"
      item-key="name"
      class="elevation-1"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Codigo",
          align: "left",
          sortable: false,
          value: "id"
        },
        //{ text: "Id", value: "id"},
        { text: "Fecha", value: "fecha" },
        { text: "Importe Total", value: "total" },
        { text: "Metodo de Pago", value: "metodoPago" }
      ]
    };
  },
  methods: {
    ...mapActions("venta", ["mostrarVentas"]),
    ...mapMutations("venta", ["CALCULAR_TOTAL", "SET_METODO_PAGO", "SET_TOTAL"]),
    ...mapGetters("venta", ["GET_VENTAS"])
  },
  created() {
    this.mostrarVentas();
  }
};
</script>

<style>
</style>