<template>
  <v-card class="mx-auto text-center" :elevation="5" color="cyan" outlined tile>
    <v-card-text class="pa-2">
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="diagramaLineal.data"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          line-width="3"
          auto-draw
        >
          <template v-slot:label="item">${{ item.value }}</template>
        </v-sparkline>
      </v-sheet>
    </v-card-text>
    <v-card-text>
      <div style="color:white;" class="display-1 font-weight-thin">{{ diagramaLineal.titulo }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    diagramaLineal: {
      type: Array,
      default: {
        titulo: "Ventas del Dia",
        data: [611, 851, 870, 900, 741, 469, 746, 674]
      }
    }
  },
  data: () => ({
    value: [423, 446, 675, 510, 590, 610, 760]
  })
};
</script>

<style></style>
