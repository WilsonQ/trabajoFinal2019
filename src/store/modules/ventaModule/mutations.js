import { adartarProductoFiltrado } from "../../../functions/filter-functions";
export default {
  SET_PRODUCTO(state, payload) {
    state.producto = payload;
    this.commit("venta/ADAPTAR_PRODUCTO");
  },
  SET_NOTIFICACION(state, notificacion) {
    state.notificacion = notificacion;
  },
  SET_ITEMS_VENTA(state, payload) {
    state.itemsVenta = payload;
  },
  SET_METODO_PAGO(state, MetodoPago) {
    state.MetodoPago = MetodoPago;
    console.log("SET", state.MetodoPago);
  },
  SET_CODIGO(state, search) {
    state.codigo = search;
  },
  SET_RESPUESTA(state, respuesta) {
    console.log("respuesta", respuesta);
    state.respuesta = respuesta;
  },
  SET_VENTA(state, venta) {
    state.venta = venta;
  },
  SET_TOTAL(state, total) {
    state.total = total;
  },
  SET_VENTAS(state, ventas) {
    state.ventas = ventas;
  },
  SET_ITEM(state, item) {
    state.item = item;
  },
  ADAPTAR_PRODUCTO(state) {
    console.log("filter", state.producto.data);
    if (state.producto.data !== null && state.producto.status !== 500) {
      console.log("ESTOY AKA(-_-)", state.producto);
      const adaptada = adartarProductoFiltrado(state.producto.data);
      state.item = adaptada;
      this.commit("venta/VALIDAR_ITEM_DUPLICADO");
    } else {
      state.item = null;
      state.duplicado && (state.duplicado = false);
      console.log("codigo Incorrecto", state.duplicado);
    }
    this.commit("venta/AGREGAR_ITEM");
    console.log("item", state.item);
  },
  AGREGAR_ITEM(state) {
    if (state.item !== null && !state.duplicado) {
      console.log("enviando duplicado...", state.duplicado);
      console.log("agregando dato... ", state.item);
      const { seleccion } = state.item;
      state.item.subtotal = seleccion;
      state.itemsVenta.push(state.item);
      state.spinner = false;
      state.codigo = "";
    } else {
      state.notificacion = true;
      state.spinner = false;
    }
  },
  VALIDAR_ITEM_DUPLICADO(state) {
    const { codigo } = state.item;
    const duplicado = state.itemsVenta.find(item => item.codigo === codigo);
    console.log("hay duplicado", duplicado);
    if (duplicado !== undefined) {
      state.duplicado = true;
    } else {
      state.duplicado = false;
    }
  },
  BORRAR_ITEM(state, item) {
    const index = state.itemsVenta.indexOf(item);
    confirm("¿Seguro que queres eliminar este producto?") &&
      state.itemsVenta.splice(index, 1);
  },
  LIMPIAR_ITEMS(state) {
    state.itemsVenta = [];
    state.total = 0;
    state.MetodoPago = null;
    state.venta = {};
    state.item = {};
    state.codigo = "";
    state.venta = {};
    if (state.itemsVenta.length === 0)
      console.log("limpiando...", state.itemsVenta);
  },
  CALCULAR_TOTAL(state) {
    state.total = 0;
    state.itemsVenta.map(item => {
      state.total += item.subtotal;
    });
  }
};
