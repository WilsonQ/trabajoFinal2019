import { GET_PRODUCTO, POST_VENTA, GET_VENTAS } from "../../../service";
export default {
  productoData: ({ commit }, payload) => {
    console.log("Store: ", payload);
    commit("setProducto", payload);
  },
  buscarProducto: async ({ commit }, codigo) => {
    const payload = await GET_PRODUCTO(codigo);
    console.log("action here payload", payload);
    commit("SET_PRODUCTO", payload);
    // commit("FILTRAR_PRODUCTO");
  },
  guardarVenta: async ({ commit, state }) => {
    //state.venta.codigo = state.codigo;
    state.venta.items = state.itemsVenta;
  
    state.venta.MetodoPago = state.MetodoPago;
    state.venta.total = state.total;
    const payload = await POST_VENTA(state.venta);
    commit("SET_RESPUESTA", payload);
  },
  mostrarVentas: async ({ commit }) => {
    const ventas = await GET_VENTAS();
    commit("SET_VENTAS", ventas.data);
  }
};
