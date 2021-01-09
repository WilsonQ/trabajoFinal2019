<template>
  <v-card elevation="5" max-height="400" class="pa-2" outlined tile>
    <v-card-text class="pa-0">
      <v-sheet>
        <AreaChart :diagramaArea="GET_ESTADISTICAS_DATA().diagramaLineal" style="height:300px;" />
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import AreaChart from "@/components/Chart/Area.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    AreaChart
  },
  methods: {
    ...mapGetters("estadisticas", ["GET_ESTADISTICAS_DATA"])
  }
};
</script>

<style></style>
