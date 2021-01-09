<template>
  <div>
    <form v-if="!this.GET_MODIFICAR_PRODUCTO().listar">
      <b-row mt="-5">
        <b-col md="6">
          <p align="left">Codigo de Producto</p>
          <b-input-group>
            <b-form-input
              type="text"
              v-on:keydown.enter.prevent="UpdateProducto()"
              v-model="codigo"
              :state="ValidaBuscar"
              placeholder="Minimo 5 caracteres"
            ></b-form-input>

            <b-button variant="success" :disabled="codigo === '' " @click="UpdateProducto()">Buscar</b-button>
          </b-input-group>
        </b-col>
      </b-row>
    </form>

    <div>
      <div
        v-if="this.GET_BUSCAR_MODIFICAR_PRODUCTO()=== null && this.buscar"
        class="d-flex justify-content-center align-items-center mb-3"
      >
        <!-- <strong class="ml-3 mt-10">Cargando...</strong> -->
        <b-spinner style="width: 4rem; height: 4rem; " class="mt-12" label="Large Spinner"></b-spinner>
      </div>
      <form
        v-if="this.GET_BUSCAR_MODIFICAR_PRODUCTO()!== null || this.GET_MODIFICAR_PRODUCTO().listar "
      >
        <b-row mt="-5">
          <b-col md="4">
            <p>Codigo de Producto</p>
            <b-form-input
              type="text"
              v-model="Producto.codigo"
              :state="ValidaCodigo"
              placeholder="Minimo 5 caracteres"
              disabled
            ></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Nombre</p>
            <b-form-input
              type="text"
              v-model="Producto.nombre"
              :state="ValidaNombre"
              placeholder="Minimo 5 caracteres"
            ></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Marca</p>
            <b-form-input type="text" v-model="Producto.marca"></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Categoria</p>
            <b-form-select v-model="Producto.categoria" :options="categorias"></b-form-select>
          </b-col>
          <b-col md="4">
            <p>Costo(USD)</p>
            <b-form-input type="number" v-model="Producto.costoUSD"></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Precio</p>
            <b-form-input
              type="number"
              v-model="Producto.precio"
              :state="ValidaPrecio"
              placeholder="No puede estar vacio"
            ></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Precio 2</p>
            <b-form-input type="number" v-model="Producto.precio2"></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Precio 3</p>
            <b-form-input type="number" v-model="Producto.precio3"></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Precio 4</p>
            <b-form-input type="number" v-model="Producto.precio4"></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Stock Actual</p>
            <b-form-input type="number" v-model="Producto.stock"></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Stock Minimo</p>
            <b-form-input type="number" v-model="Producto.stockMinimo"></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Stock Medio</p>
            <b-form-input type="number" v-model="Producto.stockMedio"></b-form-input>
          </b-col>
          <b-col md="4">
            <p>Imagen</p>
            <b-form-file
              v-model="file"
              :state="Boolean(file)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
          </b-col>

          <b-col md="8">
            <p>Descripcion</p>
            <b-form-textarea v-model="Producto.descripcion" rows="6" placeholder="Descripcion..."></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="2">
            <b-button
              v-if="this.GET_MODIFICAR_PRODUCTO().listar"
              block
              id="show-btn"
              @click="$router.go(-1)"
            >Volver</b-button>
          </b-col>
          <b-col offset-md="7" cols="12" md="3">
            <b-button
              id="show-btn"
              :disabled="bloqueado"
              block
              @click="ModificarProducto()"
            >Actualizar</b-button>
          </b-col>
        </b-row>
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
      </form>
      <v-snackbar color="error" vertical multi-line v-model="snackbar" :timeout="timeout">
        {{ text }}
        <v-btn text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "ModificarProducto",
  data() {
    return {
      codigo: "",
      disabled: true,
      buscar: false,
      text: "Codigo Incorrecto. No se encuentra el producto",
      timeout: 6000,
      categorias: [
        { value: "Perifericos", text: "Perifericos" },
        { value: "Cargadores", text: "Cargadores" },
        { value: "Componentes", text: "Componentes" },
        { value: "Otro", text: "Otro" }
      ],
      text1: "Registro Actualizado Correctamente",
      text2: "Error al Actualizar Registro",
      variant1: "outline-danger",
      variant2: "outline-warning",

      file: null
    };
  },
  computed: {
    ValidaBuscar() {
      if (this.codigo.length > 4) {
        return true;
      } else if (this.codigo.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaCodigo() {
      let { codigo } = this.Producto;
      if (codigo.length > 4) {
        return true;
      } else if (codigo.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaNombre() {
      let { nombre } = this.Producto;
      if (nombre.length > 4) {
        return true;
      } else if (nombre.length == 0) {
        return null;
      } else {
        return false;
      }
    },
    ValidaPrecio() {
      let { precio } = this.Producto;
      if (precio > 0) {
        return true;
      } else if (precio === null) {
        return null;
      } else {
        return false;
      }
    },
    Producto() {
      if (
        this.GET_MODIFICAR_PRODUCTO().listar ||
        this.GET_BUSCAR_MODIFICAR_PRODUCTO() === null
      ) {
        console.log(
          "Viene de la pantalla listar producto",
          this.GET_MODIFICAR_PRODUCTO()
        );
        return this.GET_MODIFICAR_PRODUCTO();
      } else {
        console.log("bloqueado:", this.bloqueado);
        return this.GET_BUSCAR_MODIFICAR_PRODUCTO();
      }
    },
    snackbar: {
      get: function() {
        return this.GET_NOTIFICACION();
      },
      set: function(value) {
        console.log("SET_NOTIFICACION", value);
        this.SET_NOTIFICACION(value);
        this.buscar = false;
      }
    },
    bloqueado: {
      get: function() {
        return this.disabled;
      },
      set: function(value) {
        this.disabled = value;
      }
    }
  },
  methods: {
    ...mapGetters("producto", [
      "GET_MODIFICAR_PRODUCTO",
      "GET_BUSCAR_MODIFICAR_PRODUCTO",
      "GET_NOTIFICACION",
      "GET_RESPUESTA"
    ]),
    ...mapMutations("producto", [
      "SET_BUSCAR_MODIFICAR_PRODUCTO",
      "SET_NOTIFICACION"
    ]),
    UpdateProducto() {
      this.$store.dispatch("producto/buscarProducto", this.codigo);
      this.$store.commit("producto/SET_BUSCAR_MODIFICAR_PRODUCTO", null);
      this.codigo = "";
      this.buscar = true;
      this.disabled = true;
    },
    ModificarProducto() {
      this.$store.dispatch("producto/modificarProducto", this.Producto);
      this.showModal();
    },
    showModal() {
      this.$store.commit("producto/SET_RESPUESTA", { status: undefined });
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();

      if (this.GET_RESPUESTA().status === 204) {
        this.$store.commit("producto/INICIALIZAR");
        this.$store.dispatch("producto/buscarProductos");
      }
    }
  },
  destroyed() {
    this.GET_MODIFICAR_PRODUCTO().listar = false;
    this.$store.commit("producto/SET_BUSCAR_MODIFICAR_PRODUCTO", null);
  },
  updated() {
    this.bloqueado = false;
  }
  
};
</script>
<style>
p {
  font-size: 20px;
}
</style>