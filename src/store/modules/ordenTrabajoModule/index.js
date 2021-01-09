import mutations from "./mutations";
import actions from "./actions";

const module_producto = {
  state: {
    ordenTrabajos: [],
    ordenTrabajo: {
      fecha: null,
      cliente: "",
      contacto: "",
      equipo: "",
      marca: "",
      modelo: "",
      Password: "",
      costoEstimado: null,
      FechaEntrega: new Date().toISOString().substr(0, 10),
      descripcion: ""
    },
    ordenTrabajoModificar: {
      fecha: null,
      cliente: "",
      contacto: "",
      equipo: "",
      marca: "",
      modelo: "",
      Password: "",
      costoEstimado: null,
      FechaEntrega: new Date().toISOString().substr(0, 10),
      descripcion: ""
    },
    ordenTrabajoImprimir: {},
    respuesta: {
      status: undefined
    },
    notificacion: false
  },

  namespaced: true,

  mutations,

  actions,

  getters: {
    GET_ORDEN_TRABAJO(state) {
      console.log("state:", state.ordenTrabajo);
      return state.ordenTrabajo;
    },
    GET_ORDEN_TRABAJO_MODIFICAR(state) {
      console.log("state:", state.ordenTrabajoModificar);
      return state.ordenTrabajoModificar;
    },
    GET_ORDEN_TRABAJO_IMPRIMIR(state) {
      console.log("state:", state.ordenTrabajoImprimir);
      return state.ordenTrabajoImprimir;
    },
    GET_ORDEN_TRABAJOS(state) {
      console.log("orden de trabajo"+state.ordenTrabajos);
      return state.ordenTrabajos;
    },
    GET_RESPUESTA(state) {
      return state.respuesta;
    },
    GET_NOTIFICACION(state) {
      return state.notificacion;
    }
  }
};

export default module_producto;
