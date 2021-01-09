import mutations from "./mutations";
import actions from "./actions";

const module_venta = {
  state: {
    id: "",
    producto: {
      status: undefined
    },
    itemsVenta: [],
    item: {},
    codigo: "",

    MetodoPago: null,
    notificacion: false,
    duplicado: false,
    spinner: false,
    total: 0,
    venta: {},
    respuesta: {
      status: undefined
    },
    ventas: [] //todas las ventas
  },

  namespaced: true,

  mutations,

  actions,

  getters: {
    GET_PRODUCTO(state) {
      return state.producto;
    },
    GET_ITEMS(state) {
      return state.itemsVenta;
    },
    GET_NOTIFICACION(state) {
      return state.notificacion;
    },
    GET_ITEM(state) {
      return state.item;
    },
    GET_RESPUESTA(state) {
      console.log("GET_RESPUESTA", state.respuesta);
      return state.respuesta;
    },
    GET_CODIGO(state) {
      return state.codigo;
    },
    GET_TOTAL(state) {
      return state.total;
    },
    GET_METODO_PAGO(state) {
      return state.MetodoPago;
    },
    GET_VENTAS(state) {
      console.log("Ventas...", state.ventas);
      return state.ventas;
    }
  }
};

export default module_venta;
