import Vue from "vue";
import Vuex from "vuex";

import module_venta from "./modules/ventaModule";
import module_producto from "./modules/productoModule";
import module_orden_trabajo from "./modules/ordenTrabajoModule";
import module_meli_publicacion from "./modules/meliPublicacionModule";
import module_home from "./modules/homeModule";
import module_estadisticas from "./modules/estadisticasModule";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    venta: module_venta,
    producto: module_producto,
    ordenTrabajo: module_orden_trabajo,
    meliPublicacion: module_meli_publicacion,
    home: module_home,
    estadisticas: module_estadisticas
  }
});
