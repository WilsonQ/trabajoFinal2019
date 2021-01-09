<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="11"></b-col>
        <b-col sm="1">
          <b-button variant="danger" @click="reset()">Borrar</b-button>
        </b-col>
      </b-row>
    </b-container>

    <form ref="form">
      <b-row mt="-5">
        <b-col md="4">
          <p align="left">Codigo de Producto *</p>
          <b-form-input
            type="text"
            v-model="GET_PRODUCTO().codigo"
            :state="ValidaCodigo"
            placeholder="Minimo 5 caracteres"
          ></b-form-input>
          <b-form-invalid-feedback :state="ValidaCodigo">Este Campo es Obligatorio</b-form-invalid-feedback>
        </b-col>
        <b-col md="4">
          <p align="left">Nombre *</p>
          <b-form-input
            type="text"
            v-model="GET_PRODUCTO().nombre"
            :state="ValidaNombre"
            placeholder="Minimo 5 caracteres"
          ></b-form-input>
          <b-form-invalid-feedback :state="ValidaNombre">Este Campo es Obligatorio</b-form-invalid-feedback>
        </b-col>
        <b-col md="4">
          <p align="left">Marca *</p>
          <b-form-input type="text" :state="validaMarca" v-model="GET_PRODUCTO().marca"></b-form-input>
          <b-form-invalid-feedback :state="validaMarca">Este Campo es Oblicatorio</b-form-invalid-feedback>
        </b-col>
        <b-col md="4">
          <p align="left">Categoria *</p>
          <b-form-select v-model="GET_PRODUCTO().categoria" :options="categorias"></b-form-select>
        </b-col>
        <b-col md="4">
          <p align="left">Costo(USD) *</p>
          <b-form-input type="number" v-model="GET_PRODUCTO().costoUSD"></b-form-input>
        </b-col>
        <b-col md="4">
          <p align="left">Precio *</p>
          <b-form-input
            type="number"
            v-model="GET_PRODUCTO().precio"
            :state="ValidaPrecio"
            placeholder="No puede estar vacio"
          ></b-form-input>
          <b-form-invalid-feedback :state="ValidaPrecio">Este Campo es Oblicatorio</b-form-invalid-feedback>
        </b-col>
        <b-col md="4">
          <p align="left">Precio 2</p>
          <b-form-input type="number" v-model="GET_PRODUCTO().precio2"></b-form-input>
        </b-col>
        <b-col md="4">
          <p align="left">Precio 3</p>
          <b-form-input type="number" v-model="GET_PRODUCTO().precio3"></b-form-input>
        </b-col>
        <b-col md="4">
          <p align="left">Precio 4</p>
          <b-form-input type="number" v-model="GET_PRODUCTO().precio4"></b-form-input>
        </b-col>
        <b-col md="4">
          <p align="left">Stock Inicial *</p>
          <b-form-input type="number" v-model="GET_PRODUCTO().stock" :state="validaStock"></b-form-input>
          <b-form-invalid-feedback :state="validaStock">Este Campo es Oblicatorio</b-form-invalid-feedback>
        </b-col>
        <b-col md="4">
          <p align="left">Stock Minimo *</p>
          <b-form-input
            type="number"
            v-model="GET_PRODUCTO().stockMinimo"
            :state="validaStockMinimo"
          ></b-form-input>
          <b-form-invalid-feedback :state="validaStockMinimo">Este Campo es Oblicatorio</b-form-invalid-feedback>
        </b-col>
        <b-col md="4">
          <p align="left">Stock Medio *</p>
          <b-form-input type="number" v-model="GET_PRODUCTO().stockMedio" :state="validaStockMedio"></b-form-input>
          <b-form-invalid-feedback :state="validaStockMinimo">Este Campo es Oblicatorio</b-form-invalid-feedback>
        </b-col>
        <b-col md="8">
          <p align="left">Descripcion</p>
          <b-form-textarea
            v-model="GET_PRODUCTO().descripcion"
            rows="6"
            placeholder="Descripcion..."
          ></b-form-textarea>
        </b-col>
        <b-col md="12">
          <Pictures :crearProducto="true" />
        </b-col>
      </b-row>
      <b-row>
        <b-col offset-md="9" cols="12" md="3">
          <b-button
            :disabled="validarCamposVacios"
            block
            @click="formSubmit()"
            id="show-btn"
          >Guardar</b-button>
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
                  v-if="GET_RESPUESTA().status === undefined"
                  class="d-flex justify-content-center align-items-center mb-3"
                >
                  <strong class="ml-3">Cargando...</strong>
                </div>
                <div v-else>
                  <div class="d-block text-center">
                    <h5>{{GET_RESPUESTA().status===500?text2:text1}}</h5>
                    <!-- <h5>{{this.GET_RESPUESTA().status}}</h5> -->
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
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Pictures from "@/components/MeliPublicacion/Imagenes.vue";
export default {
  name: "AltaProducto",
  components: {
    Pictures
  },
  data() {
    return {
      codigo: "",

      categorias: [
        { value: null, text: "Seleccione una categoria" },
        { value: "Perifericos", text: "Perifericos" },
        { value: "Cargadores", text: "Cargadores" },
        { value: "Componentes", text: "Componentes" },
        { value: "Otro", text: "Otro" }
      ],
      text1: "Registro el Producto Correctamente",
      text2: "Error al Registrar el Producto",
      variant1: "outline-danger",
      variant2: "outline-success",

      file: null,
      response: ""
    };
  },
  computed: {
    ValidaCodigo() {
      let { codigo } = this.GET_PRODUCTO();
      if (codigo.length > 4) {
        return true;
      } else if (codigo.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaNombre() {
      let { nombre } = this.GET_PRODUCTO();
      if (nombre.length > 4) {
        return true;
      } else if (nombre.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaPrecio() {
      let { precio } = this.GET_PRODUCTO();
      if (precio > 0) {
        return true;
      } else if (precio === null) {
        return null;
      } else {
        return false;
      }
    },
    validaStock() {
      let { stock } = this.GET_PRODUCTO();
      if (stock > 0) {
        return true;
      } else if (stock === null) {
        return null;
      } else {
        return false;
      }
    },
    validaMarca() {
      let { marca } = this.GET_PRODUCTO();
      if (marca.length > 4) {
        return true;
      } else if (marca.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    validaStockMinimo() {
      let { stockMinimo } = this.GET_PRODUCTO();
      if (stockMinimo > 0) {
        return true;
      } else if (stockMinimo === null) {
        return null;
      } else {
        return false;
      }
    },
    validaStockMedio() {
      let { stockMedio } = this.GET_PRODUCTO();
      if (stockMedio > 0) {
        return true;
      } else if (stockMedio === null) {
        return null;
      } else {
        return false;
      }
    },
    validarCamposVacios: function() {
      let camposVacios = 0;
      try {
        // console.log("validarCampos Vacios", Object.values(this.GET_PRODUCTO()));
        const values = Object.values(this.GET_PRODUCTO());
        values.forEach(element => {
          // console.log(element);
          if (element === "" || element === null) {
            camposVacios++;
          }
        });
        console.log("cantidad de campos vacios", camposVacios);
        console.log("CAMPOS", values);
        console.log("tamaño", values.length);
        if (
          camposVacios <= 0 &&
          values.length >= 8 &&
          this.GET_PRODUCTO().codigo !== ""
        ) {
          return false;
        } else {
          return true;
        }
      } catch (e) {
        console.log(e.message); // Object.values is not a function
      }
    }
  },
  methods: {
    ...mapGetters("producto", ["GET_PRODUCTO", "GET_RESPUESTA"]),
    ...mapGetters("meliPublicacion", ["GET_IMAGENES"]),
    ...mapMutations("producto", ["INICIALIZAR_PRODUCTO"]),
    borrar() {
      this.INICIALIZAR_PRODUCTO();
    },
    formSubmit() {
      this.GET_PRODUCTO()["pictures"] = this.GET_IMAGENES();
      this.$store.dispatch("producto/nuevoProducto", this.GET_PRODUCTO());
      this.showModal();
    },
    reset() {
      this.$refs.form.reset();
      this.borrar();
      console.log("reset");
    },
    showModal() {
      this.$refs["my-modal"].show();
      this.$store.commit("producto/SET_RESPUESTA", { status: undefined });
    },
    hideModal() {
      this.$refs["my-modal"].hide();
      if (this.GET_RESPUESTA().status === 204) {
        this.$store.commit("producto/INICIALIZAR_PRODUCTO");
        this.$store.dispatch("producto/buscarProductos");
      }
    }
  },
  destroyed() {
    this.$store.commit("producto/INICIALIZAR_PRODUCTO");
  }
};
</script>
<style>
p {
  font-size: 20px;
}
</style>