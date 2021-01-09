//Mutation es el unico encargado de manipular los datos
export default {
  //Mutations
  AGREGAR_PRODUCTOS(state, data) {
    console.log("CANTIDAD", data);
    if (data !== undefined) {
      state.productos = data;
      console.log("Agregando Productos", state.productos);
    } else {
      console.log("No se agrego nada");
    }
  },
  INICIALIZAR_PRODUCTO(state) {
    state.producto = {
      codigo: "",
      nombre: "",
      marca: "",
      stock: null,
      stockMinimo: null,
      stockMedio: null,
      precio: null,
      categoria: null
    };
    state.respuesta = {};
    console.log("INICIALIZAR_PRODUCTO", state.respuesta);
  },
  INICIALIZAR(state) {
    state.modificarProducto = {
      codigo: "",
      nombre: "",
      marca: "",
      stock: null,
      stockMinimo: null,
      stockMedio: null,
      precio: null,
      categoria: null
    };
    state.buscarModificar = null;
  },
  RESET_STOCK(state) {
    (state.stockBajo = []),
      (state.stockMedio = []),
      (state.stockAlto = []),
      (state.productos = []);
  },

  //------------->SETTER<-------------
  //state esta definido en el index con distintos atributos
  SET_PRODUCTOS(state, nuevoProductos) {
    //en este caso cambio el valor Productos del state
    state.productos = nuevoProductos;
  },
  SET_PRODUCTO(state, nuevoProducto) {
    state.producto = nuevoProducto;
  },
  SET_MODIFICAR_PRODUCTO(state, modificarProducto) {
    state.modificarProducto = modificarProducto;
  },
  SET_BUSCAR_MODIFICAR_PRODUCTO(state, modificarProducto) {
    state.buscarModificar = modificarProducto;
  },
  SET_RESPUESTA(state, respuesta) {
    console.log("respuesta", respuesta);
    state.respuesta = respuesta;
  },
  SET_NOTIFICACION(state, notificacion) {
    state.notificacion = notificacion;
  },
  SET_STOCK_BAJO(state, stockBajo) {
    state.stockBajo = stockBajo;
  },
  SET_STOCK_MEDIO(state, stockMedio) {
    state.stockMedio = stockMedio;
  },
  SET_STOCK_ALTO(state, stockAlto) {
    state.stockAlto = stockAlto;
  }
};
