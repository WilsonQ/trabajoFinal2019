<template>
  <v-card>
    <v-card-title>
      Ventas
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscar Venta"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="GET_VENTAS()"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      :search="search"
      dense
      show-expand
      :loading="GET_VENTAS().length === 0&&true"
      loading-text="Cargando... Por Favor Espere"
      class="elevation-1"
    >
      <!-- <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
        </v-toolbar>
      </template>-->
      <template v-slot:expanded-item="{ headers,item }">
        <td class="px-0" :colspan="headers.length">
          <!-- Peek-a-boo! -->
          <v-data-table
            dense
            :headers="header"
            :items="item.items"
            item-key="codigo"
            class="elevation-1"
            hide-default-footer
          ></v-data-table>
        </td>
      </template>
      <template v-slot:no-results>
        <b-alert show class="ma-2" variant="secondary">No se encuentra la Venta</b-alert>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      expanded: [],
      singleExpand: false,
      header: [
        {
          text: "Codigo",
          align: "left",
          sortable: false,
          value: "codigo"
        },
        { text: "Nombre de Producto", value: "nombre" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Sub Total", value: "subtotal" }
      ],
      headers: [
        {
          text: "Codigo",
          align: "left",
          sortable: false,
          value: "id"
        },
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