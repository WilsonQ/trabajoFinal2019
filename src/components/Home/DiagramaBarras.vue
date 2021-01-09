<template>
  <v-card elevation="5" max-height="400" class="pa-2" outlined tile>
    <v-card-text class="pa-0">
      <v-sheet color="rgba(0, 0, 0, .12)">
        <BarChart :diagramaBarras="GET_HOME_DATA().diagramaBarras" style="height:208px;" />
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import BarChart from "@/components/Chart/Bar.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    BarChart
  },
  methods: {
    ...mapGetters("home", ["GET_HOME_DATA"])
  }
};
</script>

<style></style>
