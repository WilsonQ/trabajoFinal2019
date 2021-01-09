import mutations from "./mutations";
import actions from "./actions";

const module_estadisticas = {
  state: {
    estadisticasData: [],
    respuesta: {
      status: undefined
    }
  },

  namespaced: true,

  mutations,

  actions,

  getters: {
    GET_ESTADISTICAS_DATA(state) {
      return state.estadisticasData;
    },
    GET_RESPUESTA(state) {
      return state.respuesta;
    }
  }
};

export default module_estadisticas;
