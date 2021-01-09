import {
  objectPublicacion,
  estados,
  arrayComparar,
  compararValores,
  adartarPictures
} from "../../../functions/filter-functions";
//Mutation es el unico encargado de manipular los datos
export default {
  //Mutations
  GUARDAR_PUBLICACION(state) {
    const { categoria, producto, formulario } = state;
    const publicacion = objectPublicacion(categoria, producto, formulario);
    this.commit("meliPublicacion/SET_PUBLICACION", publicacion);
  },
  AGREGAR_BREADCRUMB(state, breadcrumb) {
    state.itemsBreadcrumbs.push(breadcrumb);
  },
  COMPARAR_FORMULARIO(state, array) {
    console.log("Comparando...");
    const array2 = arrayComparar(array);
    const iguales = compararValores(state.comparar, array2, true);
    console.log("Igules", iguales);
    if (iguales === 6) {
      state.notificacion = true;
    }
  },
  AGREGAR_PUBLICACION(state, publicacion) {
    publicacion.data["cambiarEstado"] = false;
    publicacion.data["allStatus"] = estados;
    publicacion.data["selectStatus"] = publicacion.data.status;
    state.publicaciones.push(publicacion.data);
  },
  AGREGAR_CATEGORIA_IMAGENES(state) {
    const { category_id } = state.publicacionModificar;
    const categoria =
      state.categoria !== null ? state.categoria.id : category_id;
    console.log("Categoria", categoria);
    state.publicacionModificar["category_id"] = categoria;
    const iguales = compararValores(
      state.compararImagenes,
      arrayComparar(state.imagenes),
      false
    );
    console.log("son iguales", iguales);
    if (state.compararImagenes.length !== iguales && iguales === 0) {
      state.publicacionModificar["pictures"] = state.imagenes;
    }
  },
  BORRAR_IMAGEN(state, item) {
    const index = state.imagenes.indexOf(item);
    confirm("¿Seguro que queres eliminar este Imagen?") &&
      state.imagenes.splice(index, 1);
  },
  PUBLICACION_MODIFICAR(state, item) {
    console.log("quien me llama", item);
    state.publicacionModificar["title"] = item.title;
    state.publicacionModificar["id"] = item.id;
    state.publicacionModificar["available_quantity"] = item.available_quantity;
    state.publicacionModificar["price"] = item.price;
    state.publicacionModificar["video_id"] = item.video_id;
    state.publicacionModificar["category_id"] = item.category_id;
    state.compararImagenes = arrayComparar(adartarPictures(item.pictures));
    console.log("compararImagenes:", state.compararImagenes[0].value.source);
    state.imagenes = adartarPictures(item.pictures);
    state.comparar = arrayComparar(state.publicacionModificar);
  },
  INICIALIZAR_PUBLICACION(state) {
    state.formulario = {};
    state.categoria = null;
    state.categorias = [];
    state.producto = null;
    state.itemsBreadcrumbs = [
      {
        name: "Inicio",
        id: 0
      }
    ];
  },
  AGREGAR_IMAGEN(state, enlace) {
    // let imagen = { img: state.imagen.data.url };
    // console.log("Imagen", imagen);
    let imagen = enlace === undefined ? state.imagen.data.url : enlace;
    // state.imagenes.push({source:imagen});
    // state.cargar = false;
    state.imagenes.push({ source: imagen });
    state.cargar = false;
  },
  //------------->SETTER<-------------
  //state esta definido en el index con distintos atributos
  SET_CATEGORIAS(state, nuevasCategorias) {
    //en este caso cambio el valor Productos del state
    state.categorias = nuevasCategorias;
  },
  SET_CARGAR(state, cargar) {
    state.cargar = cargar;
  },
  SET_HIJOS_CATEGORIAS(state, nuevosHijosCategorias) {
    state.hijosCategorias = nuevosHijosCategorias;
  },
  SET_SUB_CATEGORIAS(state, nuevosSubCategorias) {
    state.subCategorias = nuevosSubCategorias;
  },
  SET_PRODUCTO(state, nuevosProducto) {
    state.producto = nuevosProducto;
  },
  SET_CATEGORIA(state, nuevoCategoria) {
    console.log(typeof nuevoCategoria);
    state.categoria = nuevoCategoria;
  },
  SET_FORMULARIO(state, nuevoFormulario) {
    state.formulario = nuevoFormulario;
  },
  SET_PUBLICACION(state, publicacion) {
    state.publicacion = publicacion;
  },
  SET_PUBLICACIONES(state, publicaciones) {
    state.publicaciones = publicaciones;
  },
  SET_SELLERS_ITEMS(state, sellersItems) {
    state.sellersItems = sellersItems;
  },
  SET_IMAGEN(state, imagen) {
    state.imagen = imagen;
  },
  SET_IMAGENES(state, imagenes) {
    state.imagenes = imagenes;
  },
  SET_PUBLICACION_MODIFICAR(state, publicacionModificar) {
    state.publicacionModificar = publicacionModificar;
  },
  SET_DESCRIPCION(state, nuevaDescripcion) {
    state.descripcion = nuevaDescripcion;
  },
  SET_RESPUESTA(state, nuevaRespuesta) {
    state.respuesta = nuevaRespuesta;
  },
  SET_NOTIFICACION(state, notificacion) {
    state.notificacion = notificacion;
  },
  SET_ITEMS_BREADCRUMB(state, nuevoBreadcrumbs) {
    state.itemsBreadcrumbs = nuevoBreadcrumbs;
  }
};
