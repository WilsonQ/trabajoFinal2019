//Mutation es el unico encargado de manipular los datos
export default {
  //------------->SETTER<-------------
  //state esta definido en el index con distintos atributos
  SET_HOME_DATA(state, homeData) {
    //en este caso cambio el valor Productos del state
    state.homeData = homeData;
  },
  SET_RESPUESTA(state, respuesta) {
    state.respuesta = respuesta;
  }
};
