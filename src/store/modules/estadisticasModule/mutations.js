//Mutation es el unico encargado de manipular los datos
export default {
  //------------->SETTER<-------------
  //state esta definido en el index con distintos atributos
  SET_ESTADISTICAS_DATA(state, estadisticasData) {
    //en este caso cambio el valor Productos del state
    state.estadisticasData = estadisticasData;
  },
  SET_RESPUESTA(state, respuesta) {
    state.respuesta = respuesta;
  }
};
