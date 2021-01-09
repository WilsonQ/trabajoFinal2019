<template>
  <b-form-row class="mb-5">
    <b-col cols="12" md="7">
      <h1 align="left" class="mb-0">{{$route.name}}</h1>
    </b-col>
    <b-col
      cols="12"
      md="3"
      class="d-flex align-items-center justify-content-end pr-4"
      offset-md="2"
    >
      <!-- <Print :esModificar="esModificar" v-if="esModificar" /> -->
      <b-button variant="danger" @click="reset()">Borrar</b-button>
    </b-col>
  </b-form-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Print from "@/components/OrdenTrabajo/ImprimirOrdenTrabajo.vue";
export default {
  name: "titleBotton",
  components: {
    Print
  },
  props: {
    esModificar: { type: Boolean, default: false }
  },
  methods: {
    ...mapMutations("ordenTrabajo", ["LIMPIAR_FORMULARIO"]),
    reset() {
      this.LIMPIAR_FORMULARIO();
      console.log("reset");
    }
  }
};
</script>

<style>
</style>