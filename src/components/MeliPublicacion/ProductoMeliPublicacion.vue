<template>
  <v-row justify="center">
    <v-card class="mb-12 mx-5" width="100%">
      <v-card-text>Cantidad de Productos : {{this.GET_PRODUCTOS().length }}</v-card-text>

      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          item-text="Nombre"
          label="Producto"
          placeholder="Ingrese el nombre de un producto"
          prepend-icon="search"
          return-object
        ></v-autocomplete>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!model" color="primary" @click="method();">Continuar</v-btn>
        <v-btn :disabled="!model" @click="model = null" text>
          Limpiar
          <v-icon right>close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model" class="grey lighten-3 text-center">
          <v-list-item v-for="(field, i) in fields" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="field.value"></v-list-item-title>
              <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
    </v-card>
  </v-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    step: { type: Number, default: 1 },
    method: { type: Function },
    backStep: { type: Function }
  },
  data: () => ({
    descriptionLimit: 60,
    productos: [],
    dialog: false,
    loading: false,
    search: null
  }),

  computed: {
    model: {
      get: function() {
        return this.GET_PRODUCTO();
      },
      set: function(producto) {
        this.$store.commit("meliPublicacion/SET_PRODUCTO", producto);
      }
    },
    isLoading: {
      set: function(val) {
        this.loading = val;
      },
      get: function() {
        if (this.GET_PRODUCTOS().length !== 0) return false;
        return this.loading;
      }
    },
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      //le agrega los puntos si la descripcion es muy largas
      return this.GET_PRODUCTOS().map(producto => {
        console.log(this.model);
        const Nombre =
          producto.nombre.length > this.descriptionLimit
            ? producto.nombre.slice(0, this.descriptionLimit) + "..."
            : producto.nombre;
        console.log("DESCRIPCION", Nombre);
        return Object.assign({}, producto, { Nombre });
      });
    }
  },
  methods: {
    ...mapGetters("producto", ["GET_PRODUCTOS"]),
    ...mapGetters("meliPublicacion", ["GET_PRODUCTO"])
  },
  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        this.$store.dispatch("producto/buscarProductos");
        // this.productos = this.GET_PRODUCTOS();
      } catch (error) {
        console.log(error);
      }
    }
  },
  destroyed() {
    this.$store.commit("producto/SET_PRODUCTOS", []);
  }
};
</script>