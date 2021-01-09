<template>
  <v-container class="grey lighten-5">
    <!-- <v-row>
      <v-col cols="12" md="12">
        <DiagramaArea />
      </v-col>
    </v-row>-->
    <v-row>
      <v-col class="py-0" cols="12" md="8">
        <v-row>
          <v-col class="py-0" cols="12" md="12">
            <Card :items="cardData" />
          </v-col>
        </v-row>
        <v-row>
          <!-- <v-col cols="12" md="4">
            <Table :productos="GET_ESTADISTICAS_DATA().table1_3items" />
          </v-col>
          <v-col cols="12" md="4">
            <Table :productos="GET_ESTADISTICAS_DATA().table2_3items" />
          </v-col>
          <v-col cols="12" md="4">
            <Table :productos="GET_ESTADISTICAS_DATA().table3_3items" />
          </v-col>-->
          <v-col>
            <Card :items="cardData2" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <DiagramaPie />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DiagramaArea from "./diagramaArea.vue";
import DiagramaPie from "./diagramaPie.vue";
import Table from "@/components/Home/Table.vue";
import Card from "@/components/Home/Card.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    DiagramaArea,
    DiagramaPie,
    Table,
    Card
  },
  methods: {
    ...mapGetters("estadisticas", ["GET_ESTADISTICAS_DATA"])
  },
  computed: {
    cardData() {
      const {
        productoMasVendido,
        cantTotalProductos,
        cantTotalOrdenes
      } = this.GET_ESTADISTICAS_DATA();
      return [
        {
          titulo: "Producto mas vendido",
          data: productoMasVendido,
          descripcion: ""
        },
        {
          titulo: "Total Producto",
          data: cantTotalProductos,
          descripcion: ""
        },
        {
          titulo: "Total Ordenes",
          data: cantTotalOrdenes,
          descripcion: ""
        }
      ];
    },
    cardData2() {
      const {
        fecha,
        totalMensual,
        ventasMensual
      } = this.GET_ESTADISTICAS_DATA();
      let fechaData = fecha.split("T");
      return [
        {
          titulo: "Fecha",
          data: fechaData[0],
          descripcion: "Fecha Actual"
        },
        {
          titulo: "Total Mensual",
          data: totalMensual,
          descripcion: "Ventas Anual"
        },
        {
          titulo: "Ventas Mensual",
          data: ventasMensual,
          descripcion: "Cantidad de ventas"
        }
      ];
    }
  }
};
</script>

<style>
</style>