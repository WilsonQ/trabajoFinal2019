import mutations from "./mutations";
import actions from "./actions";

const module_meli_publicacion = {
  state: {
    categorias: [],
    imagen: {},
    imagenes: [
      {
        source:
          "https://informatica10.top/imagenes/monitor-curvo-full-hd-300x300.jpg"
      },
      {
        source:
          "https://pisces.bbystatic.com/image2/BestBuy_MX/images/products/1000/1000214183_sa.jpg"
      }
    ],
    publicaciones: [],
    publicacionModificar: {},
    sellersItems: [],
    itemsBreadcrumbs: [
      {
        name: "Inicio",
        id: 0
      }
    ],
    categoria: null,
    producto: null,
    hijosCategorias: {
      status: null,
      children_categories: [{ id: 10 }]
    },
    formulario: {},
    descripcion: null,
    subCategorias: true,
    publicacion: null,
    cargar: false,
    respuesta: {
      status: null
    },
    comparar: [],
    compararImagenes: [],
    notificacion: false
  },

  namespaced: true,

  mutations,

  actions,

  getters: {
    GET_CATEGORIAS(state) {
      return state.categorias;
    },
    GET_RESPUESTA(state) {
      return state.respuesta;
    },
    GET_CARGAR(state) {
      return state.cargar;
    },
    GET_HIJOS_CATEGORIAS(state) {
      return state.hijosCategorias;
    },
    GET_SUB_CATEGORIAS(state) {
      return state.subCategorias;
    },
    GET_PRODUCTO(state) {
      return state.producto;
    },
    GET_CATEGORIA(state) {
      return state.categoria;
    },
    GET_FORMULARIO(state) {
      return state.formulario;
    },
    GET_PUBLICACION(state) {
      return state.publicacion;
    },
    GET_PUBLICACIONES(state) {
      return state.publicaciones;
    },
    GET_SELLERS_ITEMS(state) {
      return state.sellersItems;
    },
    GET_IMAGEN(state) {
      return state.imagen;
    },
    GET_IMAGENES(state) {
      return state.imagenes;
    },
    GET_PUBLICACION_MODIFICAR(state) {
      return state.publicacionModificar;
    },
    GET_DESCRIPCION(state) {
      return state.descripcion;
    },
    GET_ITEMS_BREADCRUMB(state) {
      return state.itemsBreadcrumbs;
    },
    GET_NOTIFICACION(state) {
      console.log("notificacion", state.notificacion);
      return state.notificacion;
    }
  }
};

export default module_meli_publicacion;
