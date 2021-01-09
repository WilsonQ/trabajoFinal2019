import { GET_ESTADISTICAS_DATA } from "../../../service";
export default {
  obtenerEstadisticasData: async ({ commit }) => {
    const payload = await GET_ESTADISTICAS_DATA();
    console.log("Estadisticas data", payload);
    commit("SET_ESTADISTICAS_DATA", payload.data[0]);
    commit("SET_RESPUESTA", { status: payload.status });
  }
};
