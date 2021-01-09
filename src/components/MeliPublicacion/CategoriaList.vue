  <template>
  <v-row justify="center">
    <v-card class="mb-12 mx-5" width="100%">
      <v-data-table
        hide-default-header
        v-model="Seleccionado"
        :show-select="!GET_SUB_CATEGORIAS()"
        single-select
        :search="search"
        :headers="headers"
        :loading="GET_RESPUESTA().status === 500"
        focusable
        :items="categorias"
        item-key="name"
        class="elevation-1"
      >
        <template v-if="GET_SUB_CATEGORIAS()" v-slot:item.action="{ item }">
          <v-icon small @click="buscarCategoriasHijos(item)" class="mr-2">edit</v-icon>
        </template>
        <template v-slot:top>
          <v-breadcrumbs :items="GET_ITEMS_BREADCRUMB()" large>
            <template v-slot:item="props">
              <v-breadcrumbs-item
                style="cursor: pointer"
                @click="isItem(props.item)"
              >{{ ultimoNombreItems !== props.item.name ? props.item.name.toUpperCase() : props.item.name }}</v-breadcrumbs-item>
            </template>
          </v-breadcrumbs>
          <v-divider></v-divider>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              class="mb-5"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions v-if="producto" right>
            <v-btn @click="backStep" text>Volver</v-btn>
            <v-btn color="primary" :disabled="GET_CATEGORIA() === null" @click="nextStep">Continuar</v-btn>
          </v-card-actions>
          <v-card-actions v-else right>
            <v-btn color="blue darken-1" @click="save(true)" text>Cerrar</v-btn>
            <v-btn
              color="blue darken-1"
              :disabled="GET_CATEGORIA() === null"
              @click="save(false)"
              text
            >Guardar</v-btn>
          </v-card-actions>
          <v-divider></v-divider>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary">Reset</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-row>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  props: {
    producto: { type: Boolean, default: false },
    nextStep: { type: Function },
    backStep: { type: Function },
    save: { type: Function }
  },
  data() {
    return {
      search: "",
      bloqueado: true,
      selected: [],
      headers: [
        {
          text: "Categoria",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },

  computed: {
    categorias() {
      let validar = this.GET_ITEMS_BREADCRUMB().length === 1;
      if (validar) {
        this.$store.commit("meliPublicacion/SET_SUB_CATEGORIAS", true);
        return this.GET_CATEGORIAS();
      } else {
        console.log("SUBCATEGORIAS", this.GET_HIJOS_CATEGORIAS());
        console.log("status...", this.GET_RESPUESTA().status);
        return this.GET_HIJOS_CATEGORIAS().children_categories;
      }
    },
    ultimoNombreItems() {
      return this.GET_ITEMS_BREADCRUMB()[this.GET_ITEMS_BREADCRUMB().length - 1]
        .name;
    },
    Seleccionado: {
      get: function() {
        if (this.GET_CATEGORIA() === null) {
          return [];
        } else {
          return [this.GET_CATEGORIA()];
        }
      },
      set: function(categoria) {
        const valor = categoria.length !== 0 ? categoria[0] : null;
        console.log("valor", valor);
        this.$store.commit("meliPublicacion/SET_CATEGORIA", valor);
        this.search = "";
      }
    }
  },
  methods: {
    ...mapGetters("meliPublicacion", [
      "GET_CATEGORIAS",
      "GET_HIJOS_CATEGORIAS",
      "GET_SUB_CATEGORIAS",
      "GET_CATEGORIA",
      "GET_FORMULARIO",
      "GET_SUB_CATEGORIAS",
      "GET_ITEMS_BREADCRUMB",
      "GET_RESPUESTA"
    ]),
    remove(item) {
      console.log("eliminar", item.name);
      for (let i = 0; i < this.GET_ITEMS_BREADCRUMB().length; i++) {
        if (this.GET_ITEMS_BREADCRUMB()[i].name === item.name) {
          this.GET_ITEMS_BREADCRUMB().splice(
            i + 1,
            this.GET_ITEMS_BREADCRUMB().length
          );
        }
      }
    },
    isItem(subcategoria) {
      const { name, id } = subcategoria;
      let length = this.GET_ITEMS_BREADCRUMB().length - 1;
      //no realizar peticion
      //si el array solo tiene un solo atributo
      //si es el ultimo array

      if (this.GET_ITEMS_BREADCRUMB()[length].name !== name) {
        console.log("haciendo peticion");
        this.GET_ITEMS_BREADCRUMB()[0].name !== name &&
          this.$store.dispatch("meliPublicacion/buscarHijosCategoria", id);

        this.$store.commit("meliPublicacion/SET_SUB_CATEGORIAS", true);
        this.remove(subcategoria);
        this.$store.commit("meliPublicacion/SET_CATEGORIA", null);
      }
    },
    buscarCategoriasHijos(subcategoria) {
      const { id } = subcategoria;
      console.log("codigoSubcategoria", id);
      this.$store.dispatch("meliPublicacion/buscarHijosCategoria", id);
      this.search = "";
    }
  },
  created() {
    console.log("Realizando la Peticion");
    this.$store.dispatch("meliPublicacion/buscarCategorias");
  }
};
</script>