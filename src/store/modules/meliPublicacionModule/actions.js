//Estos metodos se encargan de hacer las peticiones
import {
  GET_CATEGORIAS,
  GET_HIJOS_CATEGORIAS,
  POST_PUBLICACION,
  PUT_PUBLICACION,
  GET_PUBLICACIONES,
  GET_PUBLICACION,
  CAMBIAR_ESTADO,
  DELETE_PUBLICACIONES,
  CONTRUYE_FORM_DATA,
  POST_IMAGE,
  GET_DESCRIPCION_PUBLICACION,
  PUT_DESCRIPCION_PUBLICACION
} from "../../../service/externas";
//Action se entarga de realizar todas las peticiones y luego en caso de que retorne datos se las pasa a las mutation que se encargan de modificar dicho atributo
export default {
  //TRAE TODOS LAS CATEGORIAS
  buscarCategorias: async ({ commit }) => {
    const payload = await GET_CATEGORIAS();
    if (payload.status !== 500) {
      commit("SET_CATEGORIAS", payload.data);
    } else {
      commit("SET_CATEGORIAS", []);
    }
    commit("SET_RESPUESTA", { status: payload.status });
  },
  //TRAE TODOS LOS HIJOS DE LAS CATEGORIAS
  buscarHijosCategoria: async ({ commit }, codigo) => {
    const payload = await GET_HIJOS_CATEGORIAS(codigo);
    console.log("TAMAÑO:", payload);
    if (payload.status !== 500) {
      if (payload.data.children_categories.length !== 0) {
        commit("SET_HIJOS_CATEGORIAS", payload.data);
        commit("AGREGAR_BREADCRUMB", {
          id: payload.data.id,
          name: payload.data.name
        });
      } else {
        console.log("No hay subcategorias");
        commit("SET_SUB_CATEGORIAS", false);
      }
    } else {
      commit("SET_HIJOS_CATEGORIAS", {
        status: null,
        children_categories: [{ id: 10 }]
      });
    }
    commit("SET_RESPUESTA", { status: payload.status });
  },
  guardarPublicacion: async ({ commit }, publicacion) => {
    const payload = await POST_PUBLICACION(publicacion);
    console.log("respuesta", payload);
    await commit("SET_RESPUESTA", { status: payload.status });
  },
  modificarPublicacion: async ({ commit, dispatch }, publicacion) => {
    const payload = await PUT_PUBLICACION(publicacion);
    await commit("SET_RESPUESTA", { status: payload.status });
  },
  buscarPublicaciones: async ({ commit, dispatch }) => {
    const payload = await GET_PUBLICACIONES();
    await commit("SET_SELLERS_ITEMS", payload);
    if (payload.status !== 500) {
      console.log("publicaciones", payload.data.results);
      await dispatch("obtenerTodasPublicaciones", payload.data.results);
    }
  },
  buscarPublicacion: async ({ commit }, idMeli) => {
    const payload = await GET_PUBLICACION(idMeli);
    if (payload.data.sub_status[0] !== "deleted") {
      commit("AGREGAR_PUBLICACION", payload);
    }
  },
  obtenerTodasPublicaciones: async ({ dispatch, state }, publicaciones) => {
    console.log("tiene publicaciones", state.sellersItems.data.results);
    publicaciones.map(async item => {
      await dispatch("buscarPublicacion", item);
    });
  },
  obtenerDescripcion: async ({ commit, dispatch, state }, idMeli) => {
    const payload = await GET_DESCRIPCION_PUBLICACION(idMeli);
    if (payload.status !== 500) {
      commit("SET_DESCRIPCION", payload);
    }
    await commit("SET_RESPUESTA", { status: payload.status });
  },
  modificarDescripcion: async ({ commit }, data) => {
    console.log("respuesta", data);
    const payload = await PUT_DESCRIPCION_PUBLICACION(data);
    console.log("respuesta", payload);
  },
  cambiarEstado: async ({ commit, dispatch }, estado) => {
    const payload = await CAMBIAR_ESTADO(estado);
    console.log("estado ...", payload);
    if (payload.status !== 500) {
      commit("SET_PUBLICACIONES", []);
      await dispatch("buscarPublicaciones");
    }
    await commit("SET_NOTIFICACION", true);
    await commit("SET_RESPUESTA", { status: payload.status, tipo: "estado" });
  },
  eliminarPublicacion: async ({ commit, dispatch }, id) => {
    const payload = await DELETE_PUBLICACIONES(id);
    console.log("eliminando...", payload);
    if (payload.status !== 500) {
      commit("SET_PUBLICACIONES", []);
      await dispatch("buscarPublicaciones");
    }
    await commit("SET_NOTIFICACION", true);
    await commit("SET_RESPUESTA", { status: payload.status });
  },
  subirImagen: async ({ commit, state }, ruta) => {
    //crear funcion
    const formData = CONTRUYE_FORM_DATA(ruta);
    //crear servicio
    state.cargar = true;
    const payload = await POST_IMAGE({
      formData: formData,
      type: "image"
    });
    if (payload.status !== 500 && state.publicaciones.length <= 6) {
      commit("SET_IMAGEN", payload);
      commit("AGREGAR_IMAGEN");
    }
  }
};
