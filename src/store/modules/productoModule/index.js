import mutations from "./mutations";
import actions from "./actions";

const module_producto = {
  state: {
    productos: [],
    producto: {
      codigo: "",
      nombre: "",
      marca: "",
      stock: null,
      stockMinimo: null,
      stockMedio: null,
      precio: null,
      categoria: null
    },
    buscarModificar: null,
    stockBajo: [],
    stockAlto: [],
    stockMedio: [],
    modificarProducto: {
      codigo: "",
      nombre: "",
      marca: "",
      stock: null,
      stockMinimo: null,
      stockMedio: null,
      precio: null,
      categoria: null,
      listar: false
    },
    notificacion: false,
    respuesta: {
      status: undefined
    }
  },

  namespaced: true,

  mutations,

  actions,

  getters: {
    GET_PRODUCTOS(state) {
      return state.productos;
    },
    GET_PRODUCTO(state) {
      return state.producto;
    },
    GET_MODIFICAR_PRODUCTO(state) {
      return state.modificarProducto;
    },
    GET_BUSCAR_MODIFICAR_PRODUCTO(state) {
      return state.buscarModificar;
    },
    GET_RESPUESTA(state) {
      console.log("GET_RESPUESTA", state.respuesta);
      return state.respuesta;
    },
    GET_NOTIFICACION(state) {
      return state.notificacion;
    },
    GET_STOCK_ALTO(state) {
      return state.stockAlto;
    },
    GET_STOCK_MEDIO(state) {
      return state.stockMedio;
    },
    GET_STOCK_BAJO(state) {
      return state.stockBajo;
    }
  }
};

export default module_producto;
