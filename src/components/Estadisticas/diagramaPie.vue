<template>
  <v-card elevation="5" max-height="400" class="pa-2" outlined tile>
    <v-card-text class="pa-0">
      <v-sheet>
        <PieChart :diagramaPie="diagramaTorta" style="height:215px;" />
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import PieChart from "@/components/Chart/Pie.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    PieChart
  },
  methods: {
    ...mapGetters("estadisticas", ["GET_ESTADISTICAS_DATA"])
  },
  computed: {
    diagramaTorta() {
      const { cantFisica, cantMeli } = this.GET_ESTADISTICAS_DATA();
      return {
        etiquetas: ["Mecado Libre", "Ventas Fisicas"],
        data: [cantMeli, cantFisica]
      };
    }
  }
};
</script>

<style></style>
