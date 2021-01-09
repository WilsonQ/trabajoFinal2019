//Mutation es el unico encargado de manipular los datos
export default {
  //Mutations
  LIMPIAR_FORMULARIO(state) {
    state.ordenTrabajo.cliente = "";
    state.ordenTrabajo.contacto = "";
    state.ordenTrabajo.equipo = "";
    state.ordenTrabajo.marca = "";
    state.ordenTrabajo.modelo = "";
    state.ordenTrabajo.Password = "";
    state.ordenTrabajo.costoEstimado = null;
    state.ordenTrabajo.FechaEntrega = null;
    state.ordenTrabajo.descripcion = "";
  },
  LIMPIAR_FORMULARIO_MODIFICAR(state) {
    state.ordenTrabajoModificar.cliente = "";
    state.ordenTrabajoModificar.contacto = "";
    state.ordenTrabajoModificar.equipo = "";
    state.ordenTrabajoModificar.marca = "";
    state.ordenTrabajoModificar.modelo = "";
    state.ordenTrabajoModificar.Password = "";
    state.ordenTrabajoModificar.costoEstimado = null;
    state.ordenTrabajoModificar.FechaEntrega = null;
    state.ordenTrabajoModificar.descripcion = "";
  },
  //------------->SETTER<-------------
  //state esta definido en el index con distintos atributos
  SET_ORDEN_TRABAJO(state, ordenTrabajo) {
    //en este caso cambio el valor Productos del state
    state.ordenTrabajo = ordenTrabajo;
  },
  SET_ORDEN_TRABAJO_MODIFICAR(state, ordenTrabajo) {
    state.ordenTrabajoModificar = ordenTrabajo;
  },
  SET_ORDEN_TRABAJO_IMPRIMIR(state, ordenTrabajo) {
    console.log("ordenTrabajo", ordenTrabajo);
    state.ordenTrabajoImprimir = ordenTrabajo;
  },
  SET_ORDEN_TRABAJOS(state, ordenTrabajos) {
    state.ordenTrabajos = ordenTrabajos;
  },
  SET_RESPUESTA(state, respuesta) {
    state.respuesta = respuesta;
  },
  SET_NOTIFICACION(state, notificacion) {
    state.notificacion = notificacion;
  }
};
