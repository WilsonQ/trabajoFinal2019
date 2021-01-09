<template>
  <b-container>
    <form ref="form">
      <b-row mt="-5">
        <b-col md="6" cols="12">
          <p>Titulo</p>
          <b-form-input v-model="publicacion.title" type="text"></b-form-input>
        </b-col>
        <b-col md="6" cols="12">
          <p>Precio</p>
          <b-form-input v-model="publicacion.price" type="number" placeholder="Minimo 5 caracteres"></b-form-input>
        </b-col>
        <b-col md="6" cols="12">
          <p>Stock</p>
          <b-form-input v-model="publicacion.available_quantity" type="number"></b-form-input>
        </b-col>
        <b-col md="6" cols="12">
          <p>Youtube Link</p>
          <b-form-input v-model="publicacion.video_id" type="url" placeholder="Minimo 5 caracteres"></b-form-input>
        </b-col>
        <b-col v-if="GET_RESPUESTA().status !== 500" md="6" cols="12">
          <p>Descripcion</p>
          <b-form-textarea
            v-model="descripcion"
            :disabled="GET_PUBLICACION_MODIFICAR().id === undefined"
            rows="6"
            placeholder="Descripcion..."
          ></b-form-textarea>
        </b-col>
        <b-col md="6" cols="12">
          <p>Categoria:</p>
          <Categoria />
        </b-col>
        <b-col md="12">
          <Pictures />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="2">
          <b-button block id="show-btn" @click="$router.go(-1)">Volver Atras</b-button>
        </b-col>
        <b-col offset-md="7" cols="12" md="3">
          <b-button
            block
            :disabled="block || this.GET_NOTIFICACION()"
            @click="formSubmit()"
            id="show-btn"
          >Modificar</b-button>
        </b-col>
      </b-row>
    </form>
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
                    {{GET_RESPUESTA().status}}
                    <h5 class="my-5">{{GET_RESPUESTA().status !== 200 ? text1: textModificar}}</h5>
                  </div>
                  <b-button class="mt-3" :variant="variant" block @click="hideModal()">Aceptar</b-button>
                </div>
              </div>
            </b-modal>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <v-snackbar :color="color2" vertical multi-line v-model="snackbar" :timeout="timeout">
      {{ textModificar }}
      <v-btn text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </b-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Categoria from "@/components/MeliPublicacion/CategoriaDialog.vue";
import Pictures from "@/components/MeliPublicacion/Imagenes.vue";
export default {
  components: {
    Categoria,
    Pictures
  },
  data: function() {
    return {
      file: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      // text: "Registro El Orden de Trabajo Correctamente",
      textModificar: "Se Realizo correctamente Actualizacion",
      textErrorPeticion1: "Error al Actualizar la Publicacion",
      textErrorPeticion: "No se pudo Actualizar, por favor intente mas tarde",
      variant1: "outline-warning",
      variant2: "outline-danger",
      textEliminar: "La Publicacion  fue Eliminado",
      textEliminarErrror: "No se pudo eliminar La Publicacion",
      textEstado: "Se Cambio Correctamente el Estado",
      textEstadoError: "No se Cambiar el Estado",
      color1: "success",
      color2: "error",
      timeout: 6000,
      block: true,
      description: ""
    };
  },
  props: {
    esModificar: {
      //Validar si el formulario es para modificar
      type: Boolean,
      default: false
    }
  },
  computed: {
    text() {
      if (this.GET_RESPUESTA().status === 200) {
        return this.textSuccess;
      } else {
        return this.textError;
      }
    },
    textSuccess() {
      if (this.GET_RESPUESTA().tipo === "estado") {
        return this.textEstado;
      } else {
        return this.textEliminar;
      }
    },
    textError() {
      if (this.GET_RESPUESTA().tipo === "estado") {
        return this.textEstadoError;
      } else {
        return this.textEliminarErrror;
      }
    },
    color() {
      if (this.GET_RESPUESTA().status === 200) {
        return this.color1;
      } else {
        return this.color2;
      }
    },
    variant() {
      if (this.GET_RESPUESTA().status === 200) {
        return this.variant1;
      } else {
        return this.variant2;
      }
    },
    snackbar: {
      get: function() {
        return this.GET_NOTIFICACION();
      },
      set: function(value) {
        console.log("snackbar", value);
        this.$store.commit("meliPublicacion/SET_NOTIFICACION", value);
      }
    },
    descripcion: {
      get: function() {
        if (
          this.GET_DESCRIPCION() !== null &&
          this.GET_DESCRIPCION().status !== 500
        ) {
          return this.GET_DESCRIPCION().data.plain_text;
        }
        return this.description;
      },
      set: function(val) {
        this.description = val;
      }
    },
    // text2() {
    //   if (this.esModificar) {
    //     return this.textError2;
    //   } else {
    //     return this.textError;
    //   }
    // },
    text1() {
      if (this.GET_RESPUESTA().status === 500) {
        return this.textErrorPeticion1;
      } else {
        return this.textErrorPeticion;
      }
    },
    blocke() {
      this.$store.commit(
        "meliPublicacion/COMPARAR_FORMULARIO",
        this.GET_PUBLICACION_MODIFICAR()
      );
      return this.GET_NOTIFICACION();
    },
    publicacion() {
      return this.GET_PUBLICACION_MODIFICAR();
    },
    bloqueado: {
      set: function(val) {
        this.block = val;
      },
      get: function() {
        const valor =
          this.GET_PUBLICACION_MODIFICAR().id !== undefined ? this.block : true;
        console.log("valor--->", this.blocke);
        return valor;
      }
    }
  },
  methods: {
    ...mapGetters("meliPublicacion", [
      "GET_PUBLICACION_MODIFICAR",
      "GET_DESCRIPCION",
      "GET_RESPUESTA",
      "GET_NOTIFICACION"
    ]),

    guardar() {
      console.log("cerrar");
    },
    formSubmit() {
      console.log(this.publicacion);
      //provisorio
      this.$store.dispatch("meliPublicacion/modificarDescripcion", {
        id: this.GET_PUBLICACION_MODIFICAR().id,
        descripcion: this.description
      });
      this.$store.commit("meliPublicacion/SET_RESPUESTA", {
        status: null
      });
      //Compara si el formulario no fue modificado
      this.$store.commit(
        "meliPublicacion/COMPARAR_FORMULARIO",
        this.GET_PUBLICACION_MODIFICAR()
      );

      if (!this.GET_NOTIFICACION()) {
        //agrega la categoria y las imagenes si fueron modificados
        this.$store.commit("meliPublicacion/AGREGAR_CATEGORIA_IMAGENES");
        //realiza la peticion de modificar
        this.$store.dispatch(
          "meliPublicacion/modificarPublicacion",
          this.GET_PUBLICACION_MODIFICAR()
        );
        this.showModal();
      }
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      if (
        this.GET_RESPUESTA().status === 200 ||
        this.GET_RESPUESTA().status === 409
      ) {
        this.$store.commit("meliPublicacion/INICIALIZAR_PUBLICACION");
        this.$router.push({
          name: "Listado de Publicacion"
        });
      }
    }
  },
  created() {
    if (this.GET_PUBLICACION_MODIFICAR().id !== undefined) {
      this.$store.dispatch(
        "meliPublicacion/obtenerDescripcion",
        this.GET_PUBLICACION_MODIFICAR().id
      );
    }
    console.log("status", this.GET_RESPUESTA().status);
  },
  updated() {
    this.bloqueado = false;
  },
  beforeDestroy() {
    this.$store.commit("meliPublicacion/SET_NOTIFICACION", false);
  }
};
</script>

<style>
</style>