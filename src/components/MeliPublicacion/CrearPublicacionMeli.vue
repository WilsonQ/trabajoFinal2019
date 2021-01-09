<template>
  <v-stepper v-model="e6">
    <v-stepper-header>
      <v-stepper-step :complete="e6 > 1" step="1">
        Seleccione un producto
        <small>Ingrese nombre del producto</small>
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e6 > 2" step="2">Seleccion la categoria del producto</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e6 > 3" step="3">Final</v-stepper-step>
    </v-stepper-header>

    <v-stepper-content step="1">
      <Producto :method="myFunction" :backStep="myFunction2" :step="e6" />
    </v-stepper-content>

    <v-stepper-content step="2">
      <Categoria :nextStep="myFunction" :backStep="myFunction2" :producto="true" />
    </v-stepper-content>

    <v-stepper-content step="3">
      <v-card elevation="5" class="ma-12">
        <Formulario class="ml-5" />
        <v-divider class="mb-2"></v-divider>
        <v-card-actions>
          <div class="mb-2">
            <v-btn
              color="primary"
              :disabled="GET_FORMULARIO().estado ===  undefined"
              @click="guardandoPublicidad()"
            >Guardar</v-btn>
            <v-btn color="primary" @click="carcelarPublicacion" text>Carcelar</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-stepper-content>
    <b-container mt="5">
      <b-row>
        <b-col sm="11"></b-col>
        <b-col sm="1">
          <div>
            <b-modal ref="my-modal" hide-footer title="Actualizacion de Producto">
              <div>
                <div
                  v-if="GET_RESPUESTA().status === null"
                  class="d-flex justify-content-center align-items-center mb-3"
                >
                  <strong class="ml-3">Cargando...</strong>
                </div>
                <div v-else>
                  <div class="d-block text-center">
                    <h5 class="my-5">{{GET_RESPUESTA().status===500?textError:text}}</h5>
                  </div>
                  <b-button
                    class="mt-3"
                    :variant="GET_RESPUESTA().status===500?variant1:variant2"
                    block
                    @click="hideModal()"
                  >Aceptar</b-button>
                </div>
              </div>
            </b-modal>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </v-stepper>
</template>

<script>
import Producto from "@/components/MeliPublicacion/ProductoMeliPublicacion.vue";
import Categoria from "@/components/MeliPublicacion/CategoriaList.vue";
import Formulario from "@/components/MeliPublicacion/Formulario.vue";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    Formulario,
    Producto,
    Categoria
  },
  data() {
    return {
      e6: 1,
      text: "Se registro la Publicacion en MercadoLibre Correctamente",
      textModificar: "Se creo la publicacion en MercadoLibre Correctamente",
      textError:
        "Error al Registrar la Publicacion en MercadoLibre Correctamente",
      textError2: "Error al Modificar la Orden de Trabajo",
      variant1: "outline-danger",
      variant2: "outline-warning"
    };
  },
  computed: {
    text1() {
      if (this.esModificar) {
        return this.textModificar;
      } else {
        return this.text;
      }
    },
    text2() {
      if (this.esModificar) {
        return this.textError2;
      } else {
        return this.textError;
      }
    }
  },
  methods: {
    ...mapGetters("meliPublicacion", [
      "GET_PUBLICACION",
      "GET_FORMULARIO",
      "GET_RESPUESTA"
    ]),
    myFunction() {
      console.log("siguiente", this.e6);
      this.e6 += 1;
    },
    myFunction2() {
      console.log("siguiente", this.e6);
      this.e6 -= 1;
    },
    guardandoPublicidad() {
      this.$store.commit("meliPublicacion/SET_RESPUESTA", {
        status: null
      });
      this.$store.commit("meliPublicacion/GUARDAR_PUBLICACION");
      if (this.GET_PUBLICACION() !== null) {
        console.log(".....>", this.GET_PUBLICACION());
        this.$store.dispatch(
          "meliPublicacion/guardarPublicacion",
          this.GET_PUBLICACION()
        );
      }
      this.showModal();
    },
    carcelarPublicacion() {
      this.$store.commit("meliPublicacion/INICIALIZAR_PUBLICACION");
      this.$store.dispatch("meliPublicacion/buscarCategorias");
      this.e6 = 1;
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      if (this.GET_RESPUESTA().status !== 500) {
        this.$store.commit("meliPublicacion/INICIALIZAR_PUBLICACION");
        this.$store.dispatch("meliPublicacion/buscarCategorias");
        this.$store.commit("producto/SET_PRODUCTOS", []);
        this.$store.dispatch("producto/buscarProductos");
        this.e6 = 1;
      }
    }
  },
  destroyed() {
    this.$store.commit("meliPublicacion/INICIALIZAR_PUBLICACION");
    this.e6 = 1;
  }
};
</script>