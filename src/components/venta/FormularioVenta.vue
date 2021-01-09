<template>
  <div>
    <b-form-row class="mb-5">
      <b-col cols="12" md="4">
        <label for="text-password">Codigo de Producto</label>
        <b-input-group>
          <b-form-input
            autofocus
            type="text"
            v-on:keydown.enter.prevent="agregarItemTabla(codigo)"
            :state="ValidaCodigo"
            v-model="codigo"
            max="5"
            placeholder="Minimo 5 caracteres"
          ></b-form-input>

          <b-button variant="success" :disabled="codigo === '' " @click="agregarItemTabla(codigo)">
            Buscar
            <b-spinner
              v-if="this.$store.state.venta.spinner"
              small
              class="ml-2"
              label="Small Spinner"
            ></b-spinner>
          </b-button>
        </b-input-group>
      </b-col>
      <b-col cols="12" md="1" offset-md="7">
        <b-button class="mt-7" variant="danger" @click="clear()">Borrar</b-button>
      </b-col>
    </b-form-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    //
  }),
  computed: {
    ...mapState("venta", ["productos"]),
    ValidaCodigo() {
      if (this.codigo.length > 4) {
        return true;
      } else if (this.codigo.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    codigo: {
      get: function() {
        return this.GET_CODIGO();
      },
      set: function(value) {
        this.SET_CODIGO(value);
      }
    }
  },
  methods: {
    ...mapMutations("venta", [
      "SET_CODIGO",
      "FILTRAR_PRODUCTO",
      "AGREGAR_ITEM",
      "LIMPIAR_ITEMS"
    ]),
    ...mapGetters("venta", ["GET_CODIGO", "GET_RESPUESTA"]),
    agregarItemTabla(query) {
      this.$store.dispatch("venta/buscarProducto", query);
      this.$store.state.venta.spinner = true;
    },
    clear() {
      this.LIMPIAR_ITEMS();
    }
  }
};
</script>

<style>
</style>