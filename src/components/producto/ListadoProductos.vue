<template>
  <div>
    <v-card>
      <v-card-title>
        <b-row>
          <b-col class="py-0" cols="12" md="4">
            <v-select
              v-model="select"
              :items="items"
              item-text="state"
              item-value="value"
              label="Select"
              return-object
              single-line
              hint="Eliga Un Filtro"
              persistent-hint
            ></v-select>
          </b-col>
          <b-col class="py-0" offset-md="4" cols="12" md="4">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Buscar Producto"
              single-line
              hide-details
              class="mb-8"
            ></v-text-field>
          </b-col>
        </b-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="productos"
        item-key="codigo"
        :search="search"
        :loading="productos.length === 0&&true"
        loading-text="Cargando... Por Favor Espere"
        class="elevation-1"
        sort-by="calories"
      >
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="modificar(item)">edit</v-icon>
          <v-icon small @click.stop="setDialog(item)">delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
        <template v-slot:no-results>
          <b-alert show class="ma-2" variant="secondary">No se encuentra el Producto</b-alert>
        </template>
        <template v-slot:item.stock="{ item }">
          <v-chip :color="getColor(item)" dark>{{ item.stock }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
    <!-- DIALOG -->
    <div class="text-center">
      <v-dialog v-model="dialog" persistent width="500">
        <v-card>
          <!-- <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title> -->
          <v-toolbar class="mb-10" color="dark1" dark>
            <v-toolbar-title>Eliminar Producto</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>

          <v-card-text
            class="title"
          >{{`¿Estas seguro que queres eliminar "${productoEliminar.nombre}"?`}}</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="red darken-1" text @click="eliminar()">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar :color="color" vertical multi-line v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "ListadoProductos",
  data() {
    return {
      text2: "El Producto fue Eliminado",
      text1: "No se pudo eliminar El Producto",
      color1: "success",
      color2: "error",
      timeout: 6000,
      dialog: false,
      productoEliminar: {},
      search: "",
      select: { state: "Todos", value: "todos" },
      items: [
        { state: "Todos", value: "todos" },
        { state: "Stock Bajo", value: "bajo" },
        { state: "Stock Medio", value: "medio" },
        { state: "Stock Alto", value: "alto" }
      ],
      headers: [
        {
          text: "Codigo",
          align: "left",
          sortable: false,
          value: "codigo"
        },
        { text: "Nombre", value: "nombre" },
        { text: "Marca", value: "marca" },
        { text: "Precio", value: "precio" },
        { text: "Stock", value: "stock" },
        { text: "Stock Minimo", value: "stockMinimo" },
        { text: "CostoUSD", value: "costoUSD" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  methods: {
    ...mapGetters("producto", [
      "GET_PRODUCTOS",
      "GET_STOCK_ALTO",
      "GET_STOCK_MEDIO",
      "GET_STOCK_BAJO",
      "GET_RESPUESTA",
      "GET_NOTIFICACION"
    ]),
    ...mapMutations("producto", [
      "SET_MODIFICAR_PRODUCTO",
      "AGREGAR_STOCK_BAJO",
      "SET_NOTIFICACION"
    ]),
    modificar(item) {
      console.log("llego el item", item);
      item.listar = true;
      this.SET_MODIFICAR_PRODUCTO(item);
      this.$router.push({
        name: "UpdateProduct"
      });
      // params: { codigo: item.codigo }
    },
    eliminar() {
      console.log("Eliminando...", this.productoEliminar.codigo);
      this.$store.dispatch(
        "producto/eliminarProducto",
        this.productoEliminar.codigo
      );
      this.dialog = false;
    },
    getColor(elemento) {
      // let { stock, stockMinimo, stockMedio } = elemento;
      if (elemento.stock === "0" || elemento.stock <= elemento.stockMinimo) {
        return "red";
      } else if (elemento.stock > elemento.stockMinimo && elemento.stock <= elemento.stockMedio) {//stockMedio) {
        return "yellow";
      } else {
        return "green";
      }
    },
    setDialog(item) {
      this.dialog = true;
      this.productoEliminar = item;
      console.log("item", this.productoEliminar);
    }
  },
  computed: {
    productos: function() {
      let { value } = this.select;

      console.log("table", value);
      if (value === "todos") {
        console.log("todos");
        return this.GET_PRODUCTOS();
      } else if (value === "bajo") {
        console.log("bajo");
        return this.GET_STOCK_BAJO().data;
      } else if (value === "medio") {
        console.log("medio");
        return this.GET_STOCK_MEDIO().data;
      } else if (value === "alto") {
        console.log("alto");
        return this.GET_STOCK_ALTO().data;
      }
    },
    text() {
      if (this.GET_RESPUESTA().status === 200) {
        return this.text2;
      } else {
        return this.text1;
      }
    },
    color() {
      if (this.GET_RESPUESTA().status === 200) {
        return this.color1;
      } else {
        return this.color2;
      }
    },
    snackbar: {
      get: function() {
        return this.GET_NOTIFICACION();
      },
      set: function(value) {
        console.log("SET_NOTIFICACION", value);
        this.SET_NOTIFICACION(value);
        // this.buscar = false;
      }
    }
  },
  created() {
    console.log("Realizando la Peticion");
    this.$store.dispatch("producto/buscarProductos");
    this.$store.dispatch("producto/getStockBajo");
    this.$store.dispatch("producto/getStockMedio");
    this.$store.dispatch("producto/getStockAlto");
  },
  destroyed() {
    this.$store.commit("producto/RESET_STOCK");
  }
};
</script>