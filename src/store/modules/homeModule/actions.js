import { GET_HOME_DATA } from "../../../service";
export default {
  obtenerHomeData: async ({ commit }) => {
    const payload = await GET_HOME_DATA();
    console.log("home data", payload);
    commit("SET_HOME_DATA", payload.data);
    commit("SET_RESPUESTA", { status: payload.status });
  }
};
