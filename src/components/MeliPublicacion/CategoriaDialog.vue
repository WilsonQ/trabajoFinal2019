<template>
  <div>
    <v-banner elevation="5" v-model="v0" single-line transition="slide-y-transition">
      {{GET_CATEGORIA()=== null?"Seleccione Categoria":GET_CATEGORIA().name}}
      <template
        v-slot:actions="{ dismiss }"
      >
        <v-row justify="center">
          <v-dialog v-model="dialog" scrollable max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn
                text
                v-on="on"
                :disabled="GET_PUBLICACION_MODIFICAR().id === undefined"
                color="primary"
              >Cambiar</v-btn>
            </template>
            <Categoria :save="guardarCategoria" />
          </v-dialog>
        </v-row>
      </template>
    </v-banner>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Categoria from "@/components/MeliPublicacion/CategoriaList.vue";
export default {
  components: {
    Categoria
  },
  data: () => ({
    v0: true,
    dialogm1: "",
    dialog: false
  }),
  methods: {
    ...mapGetters("meliPublicacion", [
      "GET_PUBLICACION_MODIFICAR",
      "GET_CATEGORIA"
    ]),
    guardarCategoria(cerrar) {
      if (cerrar) {
        this.$store.commit("meliPublicacion/SET_CATEGORIA", null);
        this.$store.commit("meliPublicacion/SET_ITEMS_BREADCRUMB", [
          {
            name: "Inicio",
            id: 0
          }
        ]);
      }
      this.dialog = false;
    }
  }
};
</script>