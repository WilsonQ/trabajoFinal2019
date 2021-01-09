<template>
  <form ref="form">
    <b-row>
      <b-col md="11" cols="12">
        <p>Estado</p>
        <b-form-select v-model="GET_FORMULARIO().estado" :options="categorias"></b-form-select>
      </b-col>
      <b-col class="pb-10" md="11" cols="12">
        <p>Youtube Link</p>
        <b-form-input v-model="GET_FORMULARIO().link" type="text"></b-form-input>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      categorias: [
        { value: "new", text: "Nuevo" },
        { value: "used", text: "Usado" }
      ]
    };
  },
  methods: {
    ...mapGetters("meliPublicacion", ["GET_FORMULARIO"])
  }
};
</script>

<style>
</style>