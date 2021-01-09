<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col cols="12" md="8">
        <Sparkline :diagramaLineal="GET_HOME_DATA().diagramaLineal" />
      </v-col>
      <v-col cols="12" md="4">
        <Table :productos="GET_HOME_DATA().table_5_items" />
      </v-col>
    </v-row>
    <Card :items="GET_HOME_DATA().cardInfo3" />
    <v-row>
      <v-col cols="12" md="8">
        <DiagramaBarras />
      </v-col>
      <v-col cols="12" md="4">
        <Table :productos="GET_HOME_DATA().table_3_items" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import Sparkline from "./Sparkline";
import Table from "./Table";
import DiagramaBarras from "./DiagramaBarras";
import Card from "./Card";

export default {
  components: {
    Table,
    Sparkline,
    DiagramaBarras,
    Card
  },
  data: () => ({
    stockBajo: {
      nombre: "Stock Bajo",
      producto: [
        {
          nombre: "calories",
          stock: 237
        },
        {
          nombre: "fat",
          stock: 9.0
        },
        {
          nombre: "carbs",
          stock: 37
        },
        {
          nombre: "carbs",
          stock: 37
        },
        {
          nombre: "carbs",
          stock: 37
        }
      ]
    },
    itemsCard: [
      {
        title: "Producto Mas Vendido",
        data: "Foster the People",
        description: "Greyhound divisely hello coldl fonwderfully"
      },
      {
        title: "Producto Menos Vendido",
        data: "Ellie Goulding",
        description: "Greyhound divisely hello coldl fonwderfully"
      },
      {
        title: "Ganancia Actual",
        data: "Papi Wilo",
        description: "Greyhound divisely hello coldl fonwderfully"
      }
    ]
  }),
  methods: {
    ...mapGetters("home", ["GET_HOME_DATA"])
  }
};
</script>

<style></style>
