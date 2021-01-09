//Estos metodos se encargan de hacer las peticiones
import {
  GET_PRODUCTOS,
  GET_PRODUCTO,
  PUT_PRODUCTO,
  DELETE_PRODUCTO,
  POST_PRODUCTO,
  GET_STOCK_BAJO,
  GET_STOCK_MEDIO,
  GET_STOCK_ALTO
} from "../../../service";
//Action se entarga de realizar todas las peticiones y luego en caso de que retorne datos se las pasa a las mutation que se encargan de modificar dicho atributo
export default {
  //TRAE SOLO UN PRODUCTO
  buscarProducto: async ({ commit }, codigo) => {
    console.log("Store: ", codigo);
    const payload = await GET_PRODUCTO(codigo);
    console.log("DATOS ", payload);
    //commit se encargar de  llamar ala mutation y pasarle los datos

    if (payload.data === null) {
      console.log("No hay data");
      commit("SET_NOTIFICACION", true);
    } else {
      commit("SET_BUSCAR_MODIFICAR_PRODUCTO", payload.data);
    }
  },
  //TRAE TODOS LOS PRODUCTOS
  buscarProductos: async ({ commit }) => {
    const payload = await GET_PRODUCTOS();
    console.log("buscarProductosACTIONS", payload);
    commit("AGREGAR_PRODUCTOS", payload.data);
  },
  //NUEVO PRODUCTO
  nuevoProducto: async ({ commit, dispatch }, producto) => {
    const payload = await POST_PRODUCTO(producto);
    // console.log("Status", payload);
    await commit("SET_RESPUESTA", payload);
    // dispatch("buscarProductos");
  },
  //MODIFICA UN PRODUCTO
  modificarProducto: async ({ commit }, producto) => {
    const payload = await PUT_PRODUCTO(producto);
    console.log("PAYLOAD", payload);
    commit("SET_RESPUESTA", payload);
  },
  //ELIMINA UN PRODUCTO
  eliminarProducto: async ({ commit, dispatch }, codigo) => {
    const payload = await DELETE_PRODUCTO(codigo);
    await commit("SET_RESPUESTA", payload);
    await commit("SET_NOTIFICACION", true);
    await dispatch("buscarProductos"); //llama buscarProducto para realizar una peticion con los datos actualizados
  },
  //---------------------------GET STOCKS---------------------------

  //STOCK BAJO
  getStockBajo: async ({ commit }) => {
    const payload = await GET_STOCK_BAJO();
    await commit("SET_STOCK_BAJO", payload);
  },
  //STOCK MEDIO
  getStockMedio: async ({ commit }) => {
    const payload = await GET_STOCK_MEDIO();
    await commit("SET_STOCK_MEDIO", payload);
  },
  //STOCK ALTO
  getStockAlto: async ({ commit }) => {
    const payload = await GET_STOCK_ALTO();
    await commit("SET_STOCK_ALTO", payload);
  }
};
