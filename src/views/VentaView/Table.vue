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
      item-key="codigo"
      :search="search"
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
          value: "codigo"
        },
        { text: "Fecha", value: "fecha" },
        { text: "Importe Total", value: "total" },
        { text: "Metodo de Pago", value: "MetodoPago" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
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