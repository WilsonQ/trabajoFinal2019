import Vue from "vue";
import Vuex from "vuex";
import Data from "./assets/data.json";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    producto: {},
    productos: Data,
    productosVenta: {}
  },
  mutations: {
    chanceDrawer(state) {
      state.drawer = !state.drawer;
    },
    setProducto(state, payload) {
      state.producto = payload;
    },
    buscarProducto: function (state,code){
      var producto;
      axios.get(code.url,{params:{codigo:code.code}}).then(response =>{
        producto = response;
        return producto;
      }).catch(e => {
            producto = e;
        })
      
    }
  },
  actions: {
    productoData: ({ commit }, payload) => {
      console.log("Store: ", payload);
      commit("setProducto", payload);
    }
  },
  getters: {
    getProductoData(state) {
      return state.producto;
    },
    getProductoVentaData(state) {
      return state.productos;
    }
  }
});
