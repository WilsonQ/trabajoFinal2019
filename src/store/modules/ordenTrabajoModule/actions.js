import {
  POST_ORDEN_TRABAJO,
  GET_ORDENES_TRABAJOS,
  DELETE_ORDEN_TRABAJO,
  PUT_ORDEN_TRABAJO
} from "../../../service";
export default {
  ordenTrabajoTodos: async ({ commit }) => {
    const OrdenesTrabajo = await GET_ORDENES_TRABAJOS();
    console.log("OrdenesTrabajo", OrdenesTrabajo);
    commit("SET_ORDEN_TRABAJOS", OrdenesTrabajo);
  },
  ordenTrabajo: ({ commit }) => {
    console.log("action here payload");
  },
  nuevoOrdenTrabajo: async ({ commit }, data) => {
    console.log("nuevoOrdenTrabajo", data);
    const responst = await POST_ORDEN_TRABAJO(data);
    if (responst.status !== 500) {
      await commit("SET_ORDEN_TRABAJO_IMPRIMIR", responst.data);
    }
    await commit("SET_RESPUESTA", responst);
    await commit("LIMPIAR_FORMULARIO");
  },
  eliminarOrdenTrabajo: async ({ commit, dispatch }, id) => {
    const responst = await DELETE_ORDEN_TRABAJO(id);
    console.log("eliminarOrdenTrabajo", responst);
    await commit("SET_RESPUESTA", responst);
    await dispatch("ordenTrabajoTodos");
    // if (responst.status === 200) {
    //   console.log("No hay data");
    await commit("SET_NOTIFICACION", true);
    // } else {
    //   commit("SET_BUSCAR_MODIFICAR_PRODUCTO", payload.data);
    // }
  },
  modificarOrdenTrabajo: async ({ commit, dispatch }, data) => {
    console.log("modificarOrdenTrabajo", data);
    const responst = await PUT_ORDEN_TRABAJO(data);
    if (responst.status !== 500) {
      await commit("SET_ORDEN_TRABAJO_IMPRIMIR", responst.data);
    }
    commit("SET_RESPUESTA", responst);
    await commit("LIMPIAR_FORMULARIO_MODIFICAR");
    // await dispatch("ordenTrabajoTodos");
  }
};
