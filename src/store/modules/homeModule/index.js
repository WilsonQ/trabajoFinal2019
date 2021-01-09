import mutations from "./mutations";
import actions from "./actions";

const module_home = {
  state: {
    homeData: [],
    respuesta: {
      status: undefined
    }
  },

  namespaced: true,

  mutations,

  actions,

  getters: {
    GET_HOME_DATA(state) {
      return state.homeData;
    },
    GET_RESPUESTA(state) {
      return state.respuesta;
    }
  }
};

export default module_home;
